import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Award, CheckCircle, RotateCcw, PartyPopper } from 'lucide-react';
import { KittyFace, KittyCrying, KittyHeart, KittyPinkBow } from './KittyStickers';
import { romanticAudio } from '../services/audioPlayer';

interface ForgivenessGameProps {
  onForgiven?: () => void;
}

const PLEA_MESSAGES = [
  'ยังไม่หายงอนหรอก 😤',
  'เค้าสำนึกผิดแล้วจริงๆ นะคะ 🥺',
  'ยอมเลี้ยงชานมไข่มุก 10 แก้วเลย 🧋',
  'ยอมให้ปาล์มมี่ตีเบาๆ 3 ทีเลย 😿',
  'เค้าสัญญาจะเป็นแฟนที่ดีที่สุด 🤞',
  'อย่าใจร้ายกับเค้าเลยน้าาคนสวย 💔',
  'คิดถึงรอยยิ้มของปาล์มมี่ที่สุด 😭',
  'เค้ารักปาล์มมี่คนเดียวในโลกเลยนะ 💖',
  'กดปุ่มสีชมพูข้างๆ เถอะน้า ขอร้องงง 🙏',
];

export const ForgivenessGame: React.FC<ForgivenessGameProps> = ({ onForgiven }) => {
  const [pleaIndex, setPleaIndex] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [isForgiven, setIsForgiven] = useState(false);
  const [runawayOffset, setRunawayOffset] = useState({ x: 0, y: 0 });

  const handleNoInteraction = () => {
    // Random hop offset
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setRunawayOffset({ x: randomX, y: randomY });
    setPleaIndex((prev) => (prev + 1) % PLEA_MESSAGES.length);
    setNoCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setIsForgiven(true);
    romanticAudio.playForgivenessFanfare();

    // Trigger sweet confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff719a', '#ff99c8', '#fec5bb', '#ffbe0b', '#fb5607'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f472b6', '#ec4899', '#fda4af'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#ec4899', '#fda4af'],
      });
    }, 300);

    if (onForgiven) onForgiven();
  };

  const handleReset = () => {
    setIsForgiven(false);
    setNoCount(0);
    setPleaIndex(0);
    setRunawayOffset({ x: 0, y: 0 });
  };

  // Grow scale of the YES button
  const yesButtonScale = Math.min(1.4, 1 + noCount * 0.08);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-pink-200 shadow-2xl shadow-pink-200/60 max-w-2xl mx-auto my-8 relative overflow-hidden">
      {/* Decorative Kitty Corner Ribbon */}
      <div className="absolute -top-3 -right-3 rotate-12 pointer-events-none">
        <KittyPinkBow size={56} />
      </div>

      {!isForgiven ? (
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center gap-3">
            <KittyCrying size={72} className="animate-float" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>คำถามชี้ชะตาหัวใจ</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-900 tracking-tight">
              ปาล์มมี่... ยกโทษให้เค้าเถอะนะคะ 🥺🎀
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-md mx-auto">
              เค้าสำนึกผิดแล้วจริงๆ นะคนดี... สัญญาว่าจะใส่ใจความรู้สึกของปาล์มมี่ให้มากที่สุด จะไม่ทำให้เสียใจอีกแล้วนะค้าบ
            </p>
          </div>

          {/* Interactive Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 min-h-[140px] relative">
            {/* YES FORGIVE BUTTON */}
            <button
              onClick={handleYes}
              style={{ transform: `scale(${yesButtonScale})` }}
              className="z-10 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-pink-300/80 hover:shadow-xl transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white animate-ping" />
              <span>ยกโทษให้แล้วนะ 🥰❤️</span>
            </button>

            {/* RUNAWAY NO BUTTON */}
            <div
              style={{
                transform: `translate(${runawayOffset.x}px, ${runawayOffset.y}px)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="z-0"
            >
              <button
                type="button"
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-medium px-5 py-3 rounded-full border border-gray-300 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                {PLEA_MESSAGES[pleaIndex]}
              </button>
            </div>
          </div>

          {noCount > 0 && (
            <p className="text-xs text-rose-500 font-semibold animate-pulse">
              (เค้าพยายามง้อปาล์มมี่ไปแล้ว {noCount} ครั้งด้วยความจริงใจล้วนๆ น้าา 🥺)
            </p>
          )}
        </div>
      ) : (
        /* FORGIVEN CERTIFICATE & CELEBRATION */
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="flex justify-center">
            <div className="relative">
              <KittyHeart size={90} className="animate-bounce" />
              <span className="absolute -top-2 -right-2 text-2xl">🎉</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="bg-rose-100 text-rose-700 px-4 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-rose-600" />
              <span>เย้!! ปาล์มมี่ยกโทษให้แล้ว</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-900">
              ขอบคุณนะคะสุดที่รักของเค้า! 💖
            </h3>
            <p className="text-sm text-gray-600">
              เค้าสัญญาว่าจะรักษาหัวใจของปาล์มมี่เป็นอย่างดีที่สุดเลยน้า
            </p>
          </div>

          {/* OFFICIAL CERTIFICATE CARD */}
          <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 border-2 border-dashed border-pink-400 rounded-3xl p-6 text-left shadow-inner relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-pink-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-pink-600" />
                <h4 className="font-bold text-pink-900 text-base sm:text-lg">
                  ใบประกาศนียบัตรยกโทษให้แฟนอย่างเป็นทางการ
                </h4>
              </div>
              <span className="text-xs text-pink-500 font-medium">No. LOVE-PALMY-001</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p>
                มอบให้แก่: <span className="font-bold text-pink-700 text-base">คุณปาล์มมี่ (คนน่ารักที่สุดในโลก)</span>
              </p>
              <p>
                ผู้สำนึกผิด: <span className="font-semibold text-gray-800">แฟนผู้สัญญาว่าจะรักและยอมเธอทุกอย่าง</span>
              </p>
              <div className="bg-white/80 p-3.5 rounded-2xl border border-pink-100 space-y-2 text-xs text-gray-600">
                <div className="font-bold text-pink-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>คำมั่นสัญญานับตั้งแต่วันนี้:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>จะรับฟังปาล์มมี่ด้วยความเข้าใจและใจเย็น</li>
                  <li>จะตอบแชตไว ไม่ปล่อยให้ต้องคิดมากหรือรอนาน</li>
                  <li>จะกอดแน่นๆ และบอกรักปาล์มมี่ทุกๆ วัน</li>
                  <li>Day One จนถึงวันข้างหน้า จะมีแค่ปาล์มมี่คนเดียว ❤️</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-pink-200 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1 text-pink-600 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                ลงนามด้วยความรักอันบริสุทธิ์
              </span>
              <span className="italic font-mono text-gray-400">
                วันที่ {new Date().toLocaleDateString('th-TH')}
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleReset}
              className="text-xs text-pink-600 hover:text-pink-800 flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-pink-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เล่นง้อใหม่อีกรอบ (เผื่ออยากแกล้งแฟนอีก)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
