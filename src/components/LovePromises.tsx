import React, { useState } from 'react';
import { Heart, Sparkles, Star, ShieldCheck, Smile } from 'lucide-react';
import { KittyRose, KittyFace } from './KittyStickers';

const REASONS = [
  { id: 1, text: 'รอยยิ้มและเสียงหัวเราะของปาล์มมี่ทำให้โลกของเค้าสดใสที่สุด 🌸' },
  { id: 2, text: 'ปาล์มมี่เป็นคนที่ใส่ใจและน่ารักกับเค้าเสมอมา 💖' },
  { id: 3, text: 'ชอบเวลาปาล์มมี่พูดเจื้อยแจ้ว เล่าเรื่องต่างๆ ให้ฟัง 🐱' },
  { id: 4, text: 'ไม่ว่าจะวันที่สุขหรือวันที่เหนื่อย การมีปาล์มมี่อยู่ข้างๆ คือสิ่งที่ดีที่สุด ✨' },
  { id: 5, text: 'ปาล์มมี่คือคนเดียวที่เค้าอยากดูแลและทำให้มีความสุขไปตลอด 🎀' },
  { id: 6, text: 'ตั้งแต่ Day One จนถึงวันนี้ หัวใจเค้ามีแค่ปาล์มมี่คนเดียวจริงๆ ❤️' },
];

export const LovePromises: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reasons' | 'promises'>('reasons');

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-pink-100 pb-5 mb-6">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <KittyRose size={48} className="animate-float" />
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-pink-900">
                มุมความในใจถึงปาล์มมี่ 💕
              </h3>
              <p className="text-xs text-gray-500">เหตุผลและคำสัญญาที่อยากบอกให้เธอรู้เสมอ</p>
            </div>
          </div>

          <div className="flex bg-pink-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('reasons')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'reasons'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-pink-600 hover:text-pink-800'
              }`}
            >
              เหตุผลที่รักปาล์มมี่ ✨
            </button>
            <button
              onClick={() => setActiveTab('promises')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'promises'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-pink-600 hover:text-pink-800'
              }`}
            >
              สัญญาใจจากแฟน 🤞
            </button>
          </div>
        </div>

        {activeTab === 'reasons' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fadeIn">
            {REASONS.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 hover:border-pink-300 transition-all flex items-start gap-3 shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-pink-200 text-pink-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  {r.id}
                </div>
                <p className="text-xs sm:text-sm text-pink-950 font-medium leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 animate-fadeIn text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-pink-900 block font-bold">1. สัญญาว่าจะฟังมากกว่าพูด</strong>
                <span>เมื่อปาล์มมี่ไม่สบายใจ เค้าจะตั้งใจรับฟังอย่างอ่อนโยน ไม่ตัดสิน และอยู่ข้างๆ เสมอ</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 flex items-start gap-3">
              <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-pink-900 block font-bold">2. สัญญาว่าจะไม่ปล่อยให้เธอต้องเข้านอนด้วยความรู้สึกแย่</strong>
                <span>ไม่ว่าจะทะเลาะกันแค่ไหน จะรีบเคลียร์ รีบกอด และบอกรักกันก่อนนอนทุกคืน</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 flex items-start gap-3">
              <Smile className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-pink-900 block font-bold">3. สัญญาว่าจะทำให้ปาล์มมี่ยิ้มได้ในทุกๆ วัน</strong>
                <span>จะเป็นความสบายใจและความอบอุ่นที่ปลอดภัยที่สุดของปาล์มมี่ตลอดไปนะคะ</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
