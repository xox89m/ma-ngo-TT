import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Cloud,
  Save,
  FolderOpen,
  Trash2,
  Plus,
  Minus,
  RotateCw,
  Heart,
  Palette,
  Check,
  ExternalLink,
  LogOut,
  RefreshCw,
  Send,
  AlertCircle
} from 'lucide-react';
import { STICKERS, StickerDefinition, KittyPinkBow, KittyFace, KittyHeart } from './KittyStickers';
import {
  googleSignIn,
  logout,
  initAuth,
  saveCardToDrive,
  listDriveCards,
  fetchDriveCardContent,
  deleteDriveCard,
  SavedCardPayload,
  DriveFileInfo
} from '../services/firebase';
import { romanticAudio } from '../services/audioPlayer';
import { User } from 'firebase/auth';

interface PlacedSticker {
  id: string;
  stickerId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  rotation: number;
}

const PRESET_MESSAGES = [
  {
    title: 'ขอโทษจากหัวใจ',
    text: `ถึง ปาล์มมี่ สุดที่รักของเค้า... 🥺\n\nเค้าขอโทษจากหัวใจจริงๆ นะคะสำหรับเรื่องที่เกิดขึ้น เค้าไม่ได้ตั้งใจจะทำให้ปาล์มมี่ต้องเสียความรู้สึกหรือคิดมากเลย เค้าสำนึกผิดแล้วจริงๆ สัญญาว่าจะระมัดระวังคำพูดและการกระทำ จะใส่ใจและรับฟังปาล์มมี่ให้มากขึ้นกว่าเดิมนะคะคนดี... ดีกันนะ 💖`,
  },
  {
    title: 'เพลง Day One ',
    text: `ถึง ปาล์มมี่ คนเก่งของเค้า 🎀\n\nตั้งแต่วันแรกที่เราเจอกัน (Day One) ปาล์มมี่คือของขวัญที่ดีที่สุดในชีวิตเค้าเสมอมา เค้าทนเห็นเธอเศร้าไม่ได้จริงๆ ขอโอกาสให้เค้าได้ดูแลและทำให้เธอกลับมายิ้มหวานๆ ได้เหมือนเดิมนะค้าบ ไม่ว่าจะวันไหนเค้าก็รักปาล์มมี่คนเดียว ❤️`,
  },
  {
    title: 'สัญญาจะเป็นเด็กดี',
    text: `ถึง คุณปาล์มมี่ (คนน่ารักที่สุดในโลก) 🐱\n\nเค้ายอมรับผิดทุกอย่างเลยค่ะ จะไม่ดื้อ ไม่ซน จะตามใจปาล์มมี่ทุกเรื่องเลย เลี้ยงชานม พาไปกินของอร่อย และกอดแน่นๆ ให้หายงอนเลยนะคนสวย ยกโทษให้เค้าน้าาา 🥺🙏`,
  },
];

const CARD_THEMES = [
  { id: 'pink-bow', name: 'โบว์ชมพูหวาน', bg: 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-pink-300' },
  { id: 'strawberry', name: 'สตรอว์เบอร์รีครีม', bg: 'bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 border-rose-300' },
  { id: 'lavender', name: 'ลาเวนเดอร์พาสเทล', bg: 'bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 border-purple-300' },
  { id: 'kitty-dots', name: 'คิตตี้ลายจุด', bg: 'bg-white bg-kitty-dots border-pink-400' },
  { id: 'kitty-stripes', name: 'ริ้วชมพูสดใส', bg: 'bg-kitty-stripes border-pink-300' },
];

interface OnlineCardStudioProps {
  onOpenGitHubModal: () => void;
  cardState: {
    to: string;
    from: string;
    message: string;
  };
  setCardState: React.Dispatch<
    React.SetStateAction<{
      to: string;
      from: string;
      message: string;
    }>
  >;
}

export const OnlineCardStudio: React.FC<OnlineCardStudioProps> = ({
  onOpenGitHubModal,
  cardState,
  setCardState,
}) => {
  const [selectedTheme, setSelectedTheme] = useState('pink-bow');
  const [stickers, setStickers] = useState<PlacedSticker[]>([
    { id: 's-1', stickerId: 'kitty-crying', x: 12, y: 15, size: 70, rotation: -8 },
    { id: 's-2', stickerId: 'kitty-pink-bow', x: 80, y: 12, size: 65, rotation: 12 },
    { id: 's-3', stickerId: 'love-letter', x: 82, y: 78, size: 60, rotation: -5 },
  ]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Auth & Google Drive States
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [driveSaveSuccess, setDriveSaveSuccess] = useState<{ name: string; webViewLink?: string } | null>(null);
  const [showDriveListModal, setShowDriveListModal] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFileInfo[]>([]);
  const [isLoadingDriveFiles, setIsLoadingDriveFiles] = useState(false);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<DriveFileInfo | null>(null);

  const cardCanvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStickerIdRef = useRef<string | null>(null);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => setUser(currentUser),
      () => setUser(null)
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
      }
    } catch (err) {
      console.error('Google Sign In failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  // Add Sticker to Card Canvas
  const handleAddSticker = (stickerDef: StickerDefinition) => {
    romanticAudio.playStickerPop();
    const newSticker: PlacedSticker = {
      id: `sticker-${Date.now()}`,
      stickerId: stickerDef.id,
      x: 35 + (Math.random() - 0.5) * 20,
      y: 40 + (Math.random() - 0.5) * 20,
      size: 64,
      rotation: Math.floor((Math.random() - 0.5) * 24),
    };
    setStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  // Dragging logic
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setSelectedStickerId(id);
    dragStickerIdRef.current = id;
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !dragStickerIdRef.current || !cardCanvasRef.current) return;
    const rect = cardCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));

    setStickers((prev) =>
      prev.map((s) => (s.id === dragStickerIdRef.current ? { ...s, x: clampedX, y: clampedY } : s))
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      dragStickerIdRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // pointer capture release fallback
      }
    }
  };

  // Sticker adjustments
  const handleResizeSelected = (delta: number) => {
    if (!selectedStickerId) return;
    setStickers((prev) =>
      prev.map((s) =>
        s.id === selectedStickerId ? { ...s, size: Math.max(36, Math.min(130, s.size + delta)) } : s
      )
    );
  };

  const handleRotateSelected = () => {
    if (!selectedStickerId) return;
    setStickers((prev) =>
      prev.map((s) => (s.id === selectedStickerId ? { ...s, rotation: (s.rotation + 15) % 360 } : s))
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedStickerId) return;
    setStickers((prev) => prev.filter((s) => s.id !== selectedStickerId));
    setSelectedStickerId(null);
  };

  // Google Drive Saving
  const handleSaveToDrive = async () => {
    if (!user) {
      await handleGoogleLogin();
      return;
    }

    setIsSavingToDrive(true);
    setDriveSaveSuccess(null);
    try {
      const payload: SavedCardPayload = {
        to: cardState.to,
        from: cardState.from,
        message: cardState.message,
        theme: selectedTheme,
        date: new Date().toISOString(),
        stickers,
        status: 'saved',
      };

      const result = await saveCardToDrive(payload, `Palmy_Apology_Card_${Date.now()}.json`);
      setDriveSaveSuccess({ name: result.name, webViewLink: result.webViewLink });
      romanticAudio.playForgivenessFanfare();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert(`ไม่สามารถบันทึกลง Google Drive ได้: ${message}`);
    } finally {
      setIsSavingToDrive(false);
    }
  };

  // Google Drive Listing
  const handleOpenDriveList = async () => {
    if (!user) {
      await handleGoogleLogin();
      return;
    }
    setShowDriveListModal(true);
    setIsLoadingDriveFiles(true);
    try {
      const files = await listDriveCards();
      setDriveFiles(files);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDriveFiles(false);
    }
  };

  const handleLoadDriveCard = async (file: DriveFileInfo) => {
    try {
      setIsLoadingDriveFiles(true);
      const data = await fetchDriveCardContent(file.id);
      if (data) {
        setCardState({
          to: data.to || 'ปาล์มมี่',
          from: data.from || 'เค้าเอง',
          message: data.message || '',
        });
        if (data.theme) setSelectedTheme(data.theme);
        if (data.stickers) setStickers(data.stickers);
        setShowDriveListModal(false);
      }
    } catch (err) {
      console.error('Error loading card:', err);
    } finally {
      setIsLoadingDriveFiles(false);
    }
  };

  // Explicit confirmation for deleting file from Google Drive as required by Workspace integration skill
  const confirmDeleteFile = async () => {
    if (!deleteConfirmTarget) return;
    try {
      await deleteDriveCard(deleteConfirmTarget.id, deleteConfirmTarget.name);
      setDriveFiles((prev) => prev.filter((f) => f.id !== deleteConfirmTarget.id));
      setDeleteConfirmTarget(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const currentThemeObj = CARD_THEMES.find((t) => t.id === selectedTheme) || CARD_THEMES[0];

  return (
    <div className="max-w-5xl mx-auto px-4 my-8 space-y-8">
      {/* SECTION HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>HELLO KITTY APOLOGY CARD STUDIO</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-900 flex items-center justify-center gap-2">
          <span>เขียนการ์ดขอโทษออนไลน์ & แปะสติกเกอร์</span>
          <KittyPinkBow size={36} />
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          ออกแบบการ์ดขอโทษให้ปาล์มมี่ แปะสติกเกอร์น่ารักๆ ขยับได้ตามใจ และเชื่อมต่อ Google Drive เพื่อเก็บเป็นความทรงจำ
        </p>
      </div>

      {/* TOP CONTROLS & DRIVE AUTH STATUS BAR */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pink-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Google Drive Account info */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 text-xs">
              <img
                src={user.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=palmy'}
                alt={user.displayName || 'Google User'}
                className="w-8 h-8 rounded-full border border-pink-300 shadow-sm"
              />
              <div>
                <p className="font-bold text-gray-800 flex items-center gap-1">
                  <span>{user.displayName || 'เชื่อมต่อ Google Drive แล้ว'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                </p>
                <p className="text-[11px] text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600 p-1 ml-2 rounded-lg"
                title="ออกจากระบบ"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* OFFICIAL SIGN IN WITH GOOGLE BUTTON AS REQUIRED BY WORKSPACE SKILL */
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium px-3.5 py-2 rounded-full border border-gray-300 shadow-sm transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isLoggingIn ? 'กำลังเชื่อมต่อ...' : 'เข้าสู่ระบบด้วย Google เพื่อบันทึกลง Drive'}</span>
            </button>
          )}
        </div>

        {/* Action Buttons: Save to Drive, Open Drive Cards, Connect GitHub */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToDrive}
            disabled={isSavingToDrive}
            className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isSavingToDrive ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>บันทึกลง Google Drive</span>
          </button>

          <button
            onClick={handleOpenDriveList}
            className="flex items-center gap-1.5 bg-white hover:bg-pink-50 text-pink-700 text-xs font-bold px-3 py-2 rounded-xl border border-pink-300 shadow-sm transition-all cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-pink-500" />
            <span>การ์ดใน Drive</span>
          </button>

          <button
            onClick={onOpenGitHubModal}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-pink-300" />
            <span>เชื่อม GitHub</span>
          </button>
        </div>
      </div>

      {/* DRIVE SAVE SUCCESS BANNER */}
      {driveSaveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>
              บันทึกการ์ดขอโทษลงใน Google Drive เรียบร้อยแล้ว:{' '}
              <strong className="font-mono text-emerald-900">{driveSaveSuccess.name}</strong>
            </span>
          </div>
          {driveSaveSuccess.webViewLink && (
            <a
              href={driveSaveSuccess.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-1"
            >
              เปิดดูใน Drive <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* MAIN STUDIO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: THE CARD CANVAS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1.5 text-pink-600 font-bold">
              <Palette className="w-4 h-4" />
              <span>ผืนการ์ดแสดงผล (คลิก &amp; ลากสติกเกอร์ได้)</span>
            </span>
            <span>สติกเกอร์บนการ์ด: {stickers.length} ชิ้น</span>
          </div>

          {/* CARD CANVAS */}
          <div
            ref={cardCanvasRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`relative w-full min-h-[460px] sm:min-h-[500px] rounded-3xl p-6 sm:p-8 border-4 shadow-xl select-none overflow-hidden transition-all duration-300 flex flex-col justify-between ${currentThemeObj.bg}`}
          >
            {/* Corner Hello Kitty Decorations */}
            <div className="absolute top-2 left-2 pointer-events-none opacity-40">
              <KittyFace size={48} />
            </div>
            <div className="absolute -bottom-2 -right-2 pointer-events-none opacity-40">
              <KittyPinkBow size={64} />
            </div>

            {/* CARD CONTENT HEADER */}
            <div className="z-10 relative space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-pink-600 tracking-wider uppercase">TO:</span>
                <input
                  type="text"
                  value={cardState.to}
                  onChange={(e) => setCardState((prev) => ({ ...prev, to: e.target.value }))}
                  className="bg-transparent font-extrabold text-xl sm:text-2xl text-pink-900 focus:outline-none focus:border-b-2 border-pink-400 w-full"
                  placeholder="ชื่อแฟน เช่น ปาล์มมี่ สุดที่รัก"
                />
              </div>
              <div className="w-16 h-1 bg-pink-400 rounded-full"></div>
            </div>

            {/* CARD BODY TEXT AREA */}
            <div className="z-10 relative my-4 flex-1">
              <textarea
                rows={7}
                value={cardState.message}
                onChange={(e) => setCardState((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full bg-white/70 backdrop-blur-xs rounded-2xl p-4 text-xs sm:text-sm text-pink-950 font-medium leading-relaxed resize-none border border-pink-200/80 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="พิมพ์ข้อความง้อแฟนจากใจ หรือเลือกจากข้อความหวานๆ ด้านล่างได้เลย..."
              />
            </div>

            {/* CARD SIGN-OFF FOOTER */}
            <div className="z-10 relative flex items-center justify-between pt-2 border-t border-pink-300/40 text-xs">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
                <span>Day One &amp; Forever</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 font-medium">จาก:</span>
                <input
                  type="text"
                  value={cardState.from}
                  onChange={(e) => setCardState((prev) => ({ ...prev, from: e.target.value }))}
                  className="bg-transparent font-bold text-pink-900 focus:outline-none focus:border-b border-pink-400 text-right w-44"
                  placeholder="คนสำนึกผิดที่รักปาล์มมี่"
                />
              </div>
            </div>

            {/* PLACED STICKERS ON CANVAS */}
            {stickers.map((s) => {
              const stickerDef = STICKERS.find((def) => def.id === s.stickerId);
              if (!stickerDef) return null;
              const Component = stickerDef.component;
              const isSelected = selectedStickerId === s.id;

              return (
                <div
                  key={s.id}
                  onPointerDown={(e) => handlePointerDown(s.id, e)}
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                    cursor: 'grab',
                    zIndex: isSelected ? 30 : 20,
                  }}
                  className={`absolute touch-none transition-shadow ${
                    isSelected ? 'ring-2 ring-pink-500 ring-offset-2 rounded-2xl shadow-lg' : ''
                  }`}
                >
                  <Component size={s.size} />
                </div>
              );
            })}
          </div>

          {/* STICKER EDIT TOOLBAR (Active when sticker is selected) */}
          {selectedStickerId && (
            <div className="bg-white rounded-2xl p-3 border border-pink-300 shadow-md flex items-center justify-between text-xs animate-fadeIn">
              <span className="font-semibold text-pink-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>ปรับขนาด &amp; หมุนสติกเกอร์ที่เลือก</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleResizeSelected(-8)}
                  className="p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg"
                  title="ย่อขนาด"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleResizeSelected(8)}
                  className="p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg"
                  title="ขยายขนาด"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRotateSelected}
                  className="p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg"
                  title="หมุน 15 องศา"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg"
                  title="ลบสติกเกอร์"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKER DRAWER, THEMES & PRESETS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* THEME PICKER */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-pink-200 shadow-md space-y-3">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-500" />
              <span>เลือกสไตล์ธีมสีการ์ด</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {CARD_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedTheme === theme.id
                      ? 'border-pink-500 bg-pink-500 text-white font-bold shadow-sm'
                      : 'border-pink-200 bg-pink-50/50 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* STICKER DRAWER */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-pink-200 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <KittyPinkBow size={20} />
                <span>คลิกเพื่อแปะสติกเกอร์บนการ์ด</span>
              </h4>
              <span className="text-[11px] text-pink-500 font-semibold">(แปะได้ไม่จำกัด)</span>
            </div>
            <div className="grid grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1">
              {STICKERS.map((st) => {
                const Comp = st.component;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleAddSticker(st)}
                    className="p-2 bg-pink-50/80 hover:bg-pink-100 rounded-2xl border border-pink-200 hover:border-pink-400 transition-all flex flex-col items-center justify-center gap-1 active:scale-90 cursor-pointer shadow-xs"
                    title={st.name}
                  >
                    <Comp size={38} />
                    <span className="text-[9px] text-gray-600 truncate max-w-full text-center">
                      {st.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PRESET SWEET MESSAGES */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 border border-pink-200 shadow-md space-y-3">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-pink-500" />
              <span>เลือกข้อความขอโทษหวานๆ สำเร็จรูป</span>
            </h4>
            <div className="space-y-2">
              {PRESET_MESSAGES.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => setCardState((prev) => ({ ...prev, message: msg.text }))}
                  className="w-full text-left p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100/80 border border-pink-200 transition-all text-xs text-gray-700 cursor-pointer"
                >
                  <p className="font-bold text-pink-800">{msg.title}</p>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">{msg.text.slice(0, 50)}...</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GOOGLE DRIVE SAVED CARDS MODAL */}
      {showDriveListModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 border-4 border-pink-200 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-gray-900 text-base">การ์ดขอโทษใน Google Drive ของคุณ</h3>
              </div>
              <button
                onClick={() => setShowDriveListModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {isLoadingDriveFiles ? (
              <div className="py-12 text-center text-xs text-gray-500 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-pink-500 mx-auto" />
                <p>กำลังค้นหาการ์ดใน Google Drive...</p>
              </div>
            ) : driveFiles.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500 space-y-2">
                <KittyHeart size={48} className="mx-auto opacity-70" />
                <p>ยังไม่มีการ์ดที่บันทึกไว้ใน Google Drive</p>
                <p className="text-[11px] text-pink-500">กดปุ่ม &ldquo;บันทึกลง Google Drive&rdquo; เพื่อบันทึกการ์ดใบแรก</p>
              </div>
            ) : (
              <div className="space-y-2">
                {driveFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 bg-pink-50/70 border border-pink-200 rounded-2xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 truncate">
                      <p className="font-bold text-pink-900 truncate">{file.name}</p>
                      <p className="text-[10px] text-gray-500">
                        {new Date(file.createdTime).toLocaleString('th-TH')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleLoadDriveCard(file)}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-xl font-bold transition-all"
                      >
                        เปิดการ์ด
                      </button>
                      <button
                        onClick={() => setDeleteConfirmTarget(file)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="ลบไฟล์"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EXPLICIT DELETE CONFIRMATION DIALOG (Mandatory requirement for destructive workspace ops) */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-rose-300 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">ยืนยันการลบไฟล์จาก Google Drive?</h4>
              <p className="text-xs text-gray-600 mt-1">
                คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์{' '}
                <strong className="text-rose-600 font-mono">{deleteConfirmTarget.name}</strong>{' '}
                ออกจาก Google Drive การกระทำนี้ไม่สามารถยกเลิกได้
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDeleteFile}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
