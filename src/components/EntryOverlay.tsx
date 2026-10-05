import React, { useState } from 'react';
import { Heart, Music, Sparkles } from 'lucide-react';
import { KittyFace, KittyPinkBow, KittyHeart } from './KittyStickers';
import { romanticAudio } from '../services/audioPlayer';
import confetti from 'canvas-confetti';

interface EntryOverlayProps {
  onEnter: () => void;
}

export const EntryOverlay: React.FC<EntryOverlayProps> = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    romanticAudio.startMusic();

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#ec4899', '#fda4af', '#f43f5e'],
    });

    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 flex items-center justify-center p-4 transition-all duration-700 ${
        isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Floating Background Petals/Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-3xl animate-float">🌸</div>
        <div className="absolute top-24 right-16 text-3xl animate-float-delayed">🎀</div>
        <div className="absolute bottom-16 left-16 text-4xl animate-sway">💖</div>
        <div className="absolute bottom-20 right-20 text-3xl animate-float">🍓</div>
      </div>

      <div className="relative max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 border-4 border-pink-300 shadow-2xl text-center space-y-6">
        {/* Hello Kitty Header Stamp */}
        <div className="relative flex justify-center">
          <KittyPinkBow size={64} className="animate-bounce" />
          <div className="absolute -bottom-2">
            <KittyFace size={72} className="animate-pulse-slow" />
          </div>
        </div>

        <div className="space-y-2 pt-6">
          <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>SPECIAL APOLOGY LETTER</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-900 tracking-tight">
            ถึง... คุณปาล์มมี่ 🎀
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
            มีคนคนหนึ่งสำนึกผิดมากๆ... อยากส่งเพลงและความในใจมาขอโทษ
          </p>
        </div>

        {/* Big Tap to Open Button */}
        <div className="pt-2">
          <button
            onClick={handleOpenLetter}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl shadow-pink-300 transition-all hover:scale-102 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer text-base sm:text-lg"
          >
            <Music className="w-5 h-5 fill-white animate-bounce" />
            <span>เปิดการ์ดขอโทษ &amp; ฟังเพลง Day One</span>
            <Heart className="w-5 h-5 fill-white animate-pulse" />
          </button>
          <p className="text-[11px] text-pink-500 mt-2 font-medium">
            (กดเปิดเพลง 🎵)
          </p>
        </div>
      </div>
    </div>
  );
};
