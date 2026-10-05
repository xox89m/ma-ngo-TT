import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Required Workspace Scope for Drive file access
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User logged in from previous session, need user interaction to retrieve drive token if expired
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface SavedCardPayload {
  to: string;
  from: string;
  message: string;
  theme: string;
  date: string;
  stickers: Array<{
    id: string;
    stickerId: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
  }>;
  status: string;
}

export interface DriveFileInfo {
  id: string;
  name: string;
  createdTime: string;
  webViewLink?: string;
}

/**
 * Upload an apology card directly to Google Drive as a JSON file
 */
export const saveCardToDrive = async (
  cardData: SavedCardPayload,
  fileName = `Palmy_Apology_Card_${Date.now()}.json`
): Promise<{ id: string; name: string; webViewLink?: string }> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to save to Drive');
  }

  const metadata = {
    name: fileName,
    mimeType: 'application/json',
    description: 'Sweet Apology Card for Palmy 🎀 saved via Love Apology App',
  };

  const fileContent = JSON.stringify(cardData, null, 2);
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    fileContent +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload to Google Drive: ${errorText}`);
  }

  return await response.json();
};

/**
 * List saved apology cards from user's Google Drive
 */
export const listDriveCards = async (): Promise<DriveFileInfo[]> => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const query = encodeURIComponent("name contains 'Palmy_Apology_Card' and trashed = false");
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,createdTime,webViewLink)&orderBy=createdTime desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.warn('Could not fetch drive files', await response.text());
      return [];
    }

    const data = await response.json();
    return data.files || [];
  } catch (err) {
    console.error('Error fetching drive files:', err);
    return [];
  }
};

/**
 * Read card data from Google Drive file
 */
export const fetchDriveCardContent = async (fileId: string): Promise<SavedCardPayload | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Could not read file from Google Drive');
  }

  return await response.json();
};

/**
 * Delete card file with explicit user confirmation
 */
export const deleteDriveCard = async (fileId: string, fileName: string): Promise<boolean> => {
  const token = await getAccessToken();
  if (!token) return false;

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.ok;
};
