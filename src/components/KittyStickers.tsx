import React from 'react';

export interface StickerDefinition {
  id: string;
  name: string;
  category: 'kitty' | 'love' | 'apology' | 'sweet';
  component: React.FC<{ size?: number; className?: string }>;
}

// 1. Classic Hello Kitty Face
export const KittyFace: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ears */}
    <path d="M22 36C18 20 28 8 36 18C44 26 40 38 40 38" fill="#FFFFFF" stroke="#333333" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M78 36C82 20 72 8 64 18C56 26 60 38 60 38" fill="#FFFFFF" stroke="#333333" strokeWidth="4.5" strokeLinejoin="round" />
    {/* Head */}
    <ellipse cx="50" cy="56" rx="42" ry="34" fill="#FFFFFF" stroke="#333333" strokeWidth="4.5" />
    {/* Bow on Left/Right */}
    <g transform="translate(62, 14)">
      <ellipse cx="14" cy="14" rx="7" ry="7" fill="#FF2E63" stroke="#333333" strokeWidth="3" />
      <path d="M14 14 C18 6, 30 4, 30 14 C30 24, 18 20, 14 14 Z" fill="#FF3366" stroke="#333333" strokeWidth="3" />
      <path d="M14 14 C8 6, -4 4, -4 14 C-4 24, 8 20, 14 14 Z" fill="#FF3366" stroke="#333333" strokeWidth="3" />
      <circle cx="14" cy="14" r="5" fill="#FF1A4B" stroke="#333333" strokeWidth="2.5" />
    </g>
    {/* Eyes */}
    <ellipse cx="32" cy="54" rx="4.5" ry="6.5" fill="#222222" />
    <ellipse cx="68" cy="54" rx="4.5" ry="6.5" fill="#222222" />
    {/* Nose */}
    <ellipse cx="50" cy="62" rx="5.5" ry="3.8" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
    {/* Whiskers Left */}
    <path d="M14 50 L2 47" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M15 56 L1 56" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M14 62 L2 65" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" />
    {/* Whiskers Right */}
    <path d="M86 50 L98 47" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M85 56 L99 56" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M86 62 L98 65" stroke="#333333" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// 2. Apology Crying Kitty
export const KittyCrying: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ears */}
    <path d="M22 36C18 20 28 8 36 18C44 26 40 38 40 38" fill="#FFFFFF" stroke="#333333" strokeWidth="4.5" />
    <path d="M78 36C82 20 72 8 64 18C56 26 60 38 60 38" fill="#FFFFFF" stroke="#333333" strokeWidth="4.5" />
    {/* Head */}
    <ellipse cx="50" cy="56" rx="42" ry="34" fill="#FFFFFF" stroke="#333333" strokeWidth="4.5" />
    {/* Bow */}
    <g transform="translate(62, 14)">
      <path d="M14 14 C18 6, 30 4, 30 14 C30 24, 18 20, 14 14 Z" fill="#F472B6" stroke="#333333" strokeWidth="3" />
      <path d="M14 14 C8 6, -4 4, -4 14 C-4 24, 8 20, 14 14 Z" fill="#F472B6" stroke="#333333" strokeWidth="3" />
      <circle cx="14" cy="14" r="5" fill="#EC4899" stroke="#333333" strokeWidth="2.5" />
    </g>
    {/* Sad Crying Eyes */}
    <path d="M28 54 Q33 48 38 54" stroke="#222" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M62 54 Q67 48 72 54" stroke="#222" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Nose & Quivering Mouth */}
    <ellipse cx="50" cy="61" rx="5" ry="3.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
    <path d="M47 67 Q50 64 53 67" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Big Anime Tear Drops */}
    <path d="M33 58 C33 58, 25 72, 33 78 C40 78, 33 58, 33 58 Z" fill="#38BDF8" opacity="0.85" />
    <path d="M67 58 C67 58, 59 72, 67 78 C74 78, 67 58, 67 58 Z" fill="#38BDF8" opacity="0.85" />
    {/* Whiskers */}
    <path d="M14 52 L2 50" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
    <path d="M14 62 L2 64" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
    <path d="M86 52 L98 50" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
    <path d="M86 62 L98 64" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 3. Kitty Hugging Heart
export const KittyHeart: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head Peek */}
    <ellipse cx="50" cy="40" rx="36" ry="28" fill="#FFFFFF" stroke="#333333" strokeWidth="4" />
    <path d="M26 24C22 12 30 4 38 12" stroke="#333" strokeWidth="4" fill="#fff" />
    <path d="M74 24C78 12 70 4 62 12" stroke="#333" strokeWidth="4" fill="#fff" />
    {/* Bow */}
    <circle cx="68" cy="22" r="5" fill="#EF4444" stroke="#333" strokeWidth="2" />
    {/* Eyes */}
    <ellipse cx="36" cy="38" rx="3.5" ry="5.5" fill="#222" />
    <ellipse cx="64" cy="38" rx="3.5" ry="5.5" fill="#222" />
    <ellipse cx="50" cy="45" rx="4.5" ry="3" fill="#FBBF24" />
    {/* Big Pink Heart being hugged */}
    <path
      d="M50 88 C20 70, 10 46, 26 34 C38 25, 48 34, 50 38 C52 34, 62 25, 74 34 C90 46, 80 70, 50 88 Z"
      fill="#FB7185"
      stroke="#E11D48"
      strokeWidth="3.5"
    />
    <path d="M35 48 Q40 40 45 48" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
    {/* Paws on Heart */}
    <ellipse cx="32" cy="50" rx="6" ry="7" fill="#FFFFFF" stroke="#333333" strokeWidth="2.5" />
    <ellipse cx="68" cy="50" rx="6" ry="7" fill="#FFFFFF" stroke="#333333" strokeWidth="2.5" />
  </svg>
);

// 4. Kitty Holding Rose
export const KittyRose: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <ellipse cx="45" cy="46" rx="34" ry="28" fill="#FFFFFF" stroke="#333333" strokeWidth="4" />
    {/* Ears */}
    <path d="M22 30C18 18 26 10 33 18" stroke="#333" strokeWidth="4" fill="#fff" />
    <path d="M68 30C72 18 64 10 57 18" stroke="#333" strokeWidth="4" fill="#fff" />
    {/* Bow */}
    <circle cx="64" cy="22" r="5" fill="#F43F5E" stroke="#333" strokeWidth="2" />
    {/* Eyes & Nose */}
    <ellipse cx="34" cy="45" rx="3.5" ry="5.5" fill="#222" />
    <ellipse cx="56" cy="45" rx="3.5" ry="5.5" fill="#222" />
    <ellipse cx="45" cy="52" rx="4" ry="2.8" fill="#FBBF24" />
    {/* Body */}
    <path d="M26 74 C26 62, 64 62, 64 74 Z" fill="#FFFFFF" stroke="#333" strokeWidth="3.5" />
    {/* Red Rose Bouquet */}
    <g transform="translate(56, 50)">
      <path d="M12 28 Q10 16 14 6" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="4" r="8" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <circle cx="14" cy="4" r="4" fill="#EF4444" />
      <path d="M12 18 Q6 16 10 12" fill="#22C55E" />
    </g>
  </svg>
);

// 5. Classic Pink Bow
export const KittyPinkBow: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(10, 20)">
      <path d="M40 30 C55 10, 80 5, 80 30 C80 55, 55 50, 40 30 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="4" />
      <path d="M40 30 C25 10, 0 5, 0 30 C0 55, 25 50, 40 30 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="4" />
      {/* Ribbons hanging down */}
      <path d="M35 35 L20 65 L36 55 L45 65 L42 35" fill="#EC4899" stroke="#BE185D" strokeWidth="3" />
      <path d="M45 35 L60 65 L44 55 L35 65 L38 35" fill="#EC4899" stroke="#BE185D" strokeWidth="3" />
      {/* Knot */}
      <ellipse cx="40" cy="30" rx="12" ry="12" fill="#DB2777" stroke="#BE185D" strokeWidth="3.5" />
      <circle cx="37" cy="27" r="3" fill="#FDF2F8" opacity="0.7" />
    </g>
  </svg>
);

// 6. Classic Red Bow
export const KittyRedBow: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(10, 20)">
      <path d="M40 30 C55 10, 80 5, 80 30 C80 55, 55 50, 40 30 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="4" />
      <path d="M40 30 C25 10, 0 5, 0 30 C0 55, 25 50, 40 30 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="4" />
      <ellipse cx="40" cy="30" rx="12" ry="12" fill="#DC2626" stroke="#991B1B" strokeWidth="3.5" />
      <circle cx="37" cy="27" r="3" fill="#FEE2E2" opacity="0.8" />
    </g>
  </svg>
);

// 7. Love Envelope
export const LoveLetter: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="15" y="28" width="70" height="48" rx="8" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="3.5" />
    <path d="M16 30 L50 56 L84 30" stroke="#F43F5E" strokeWidth="3" strokeLinejoin="round" />
    {/* Red Heart Seal */}
    <path
      d="M50 56 C44 48, 38 52, 42 58 C46 64, 50 67, 50 67 C50 67, 54 64, 58 58 C62 52, 56 48, 50 56 Z"
      fill="#E11D48"
    />
  </svg>
);

// 8. Strawberry Shortcake
export const StrawberryCake: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cake slice base */}
    <path d="M20 72 L80 72 L85 45 L50 35 L15 45 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
    <rect x="18" y="55" width="64" height="6" fill="#F472B6" />
    {/* Cream frosting */}
    <path d="M15 45 Q30 38 50 35 Q70 38 85 45 Q75 52 50 48 Q25 52 15 45 Z" fill="#FFFFFF" stroke="#DB2777" strokeWidth="2.5" />
    {/* Strawberry on top */}
    <path d="M50 20 C42 22, 38 32, 50 38 C62 32, 58 22, 50 20 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
    <circle cx="48" cy="27" r="1.5" fill="#FDF2F8" />
    <circle cx="52" cy="30" r="1.5" fill="#FDF2F8" />
  </svg>
);

// 9. Boba Milk Tea
export const BobaTea: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Straw */}
    <path d="M46 10 L58 10 L52 80" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" />
    {/* Cup */}
    <path d="M28 28 L35 84 C36 88, 64 88, 65 84 L72 28 Z" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3.5" />
    {/* Liquid */}
    <path d="M31 42 L35 84 C36 88, 64 88, 65 84 L69 42 Z" fill="#FDA4AF" />
    {/* Boba pearls */}
    <circle cx="42" cy="76" r="4.5" fill="#4B5563" />
    <circle cx="53" cy="78" r="4.5" fill="#374151" />
    <circle cx="60" cy="73" r="4.5" fill="#4B5563" />
    <circle cx="48" cy="70" r="4" fill="#374151" />
    {/* Cup Lid */}
    <ellipse cx="50" cy="28" rx="24" ry="7" fill="#FFFFFF" stroke="#E11D48" strokeWidth="3" />
  </svg>
);

// 10. Healing Band-aid with Heart
export const BandaidHeart: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="rotate(-25 50 50)">
      <rect x="20" y="38" width="60" height="24" rx="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="3" />
      <rect x="38" y="38" width="24" height="24" fill="#FFEDD5" />
      {/* Heart in middle */}
      <path
        d="M50 46 C47 42, 43 44, 45 48 C47 52, 50 54, 50 54 C50 54, 53 52, 55 48 C57 44, 53 42, 50 46 Z"
        fill="#E11D48"
      />
    </g>
  </svg>
);

// 11. Sparkling Star
export const SparkleStar: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M50 10 Q50 45 15 50 Q50 55 50 90 Q50 55 85 50 Q50 45 50 10 Z"
      fill="#FBBF24"
      stroke="#F59E0B"
      strokeWidth="3"
    />
    <circle cx="50" cy="50" r="6" fill="#FFFBEB" />
  </svg>
);

// 12. Apology Sign
export const ApologySign: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wooden Stick */}
    <rect x="47" y="60" width="6" height="32" rx="3" fill="#D97706" />
    {/* Board */}
    <rect x="12" y="20" width="76" height="42" rx="8" fill="#FFF1F2" stroke="#E11D48" strokeWidth="3.5" />
    <text x="50" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#E11D48" fontFamily="'Mali', cursive">
      ขอโทษน้า
    </text>
    <text x="50" y="56" textAnchor="middle" fontSize="9" fill="#FB7185" fontFamily="'Mali', cursive">
      🥺 ดีกันนะคะ 💖
    </text>
  </svg>
);

export const STICKERS: StickerDefinition[] = [
  { id: 'kitty-face', name: 'คิตตี้หน้าหวาน', category: 'kitty', component: KittyFace },
  { id: 'kitty-crying', name: 'คิตตี้สำนึกผิด', category: 'apology', component: KittyCrying },
  { id: 'kitty-heart', name: 'คิตตี้กอดหัวใจ', category: 'love', component: KittyHeart },
  { id: 'kitty-rose', name: 'คิตตี้ให้ดอกกุหลาบ', category: 'love', component: KittyRose },
  { id: 'kitty-pink-bow', name: 'โบว์ชมพูน่ารัก', category: 'kitty', component: KittyPinkBow },
  { id: 'kitty-red-bow', name: 'โบว์แดงคิตตี้', category: 'kitty', component: KittyRedBow },
  { id: 'apology-sign', name: 'ป้ายขอโทษน้า', category: 'apology', component: ApologySign },
  { id: 'bandaid-heart', name: 'แปะพลาสเตอร์ใจ', category: 'apology', component: BandaidHeart },
  { id: 'love-letter', name: 'จดหมายรัก', category: 'love', component: LoveLetter },
  { id: 'strawberry-cake', name: 'เค้กสตรอว์เบอร์รี', category: 'sweet', component: StrawberryCake },
  { id: 'boba-tea', name: 'ชานมไข่มุก', category: 'sweet', component: BobaTea },
  { id: 'sparkle-star', name: 'ประกายดาววิ้งวับ', category: 'sweet', component: SparkleStar },
];
