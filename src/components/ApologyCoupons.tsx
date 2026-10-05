import React, { useState } from 'react';
import { Ticket, CheckCircle2, Sparkles, HeartHandshake, Utensils, Smile, ShoppingBag, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../services/audioPlayer';

interface CouponItem {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
  stampText: string;
}

const DEFAULT_COUPONS: CouponItem[] = [
  {
    id: 'c1',
    title: 'คูปองกอดแน่นๆ เติมพลัง',
    subtitle: 'ใช้ได้ทันทีไม่มีวันหมดอายุ',
    detail: 'กอดแน่นๆ 10 นาที ชาร์จแบตหัวใจให้เต็มร้อย',
    icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
    color: 'from-pink-100 to-rose-100 border-pink-300',
    stampText: 'แลกความอบอุ่นแล้ว ❤️',
  },
  {
    id: 'c2',
    title: 'คูปองมื้ออร่อยตามใจปาล์มมี่',
    subtitle: 'บุฟเฟต์ / ชาบู / โอมากาเสะ / ขนมหวาน',
    detail: 'ปาล์มมี่เลือกร้านได้เลย เค้าเป็นสปอนเซอร์และตักให้ทั้งมื้อ',
    icon: <Utensils className="w-6 h-6 text-amber-500" />,
    color: 'from-amber-100 to-orange-100 border-amber-300',
    stampText: 'อิ่มอร่อยแน่นอน 🍰',
  },
  {
    id: 'c3',
    title: 'คูปองห้ามเถียง ตามใจ 100%',
    subtitle: 'สิทธิพิเศษสูงสุด 24 ชั่วโมง',
    detail: 'ปาล์มมี่ถูกเสมอ ไม่บ่น ไม่ขัดใจ พยักหน้ายิ้มหวานอย่างเดียว',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    color: 'from-emerald-100 to-teal-100 border-emerald-300',
    stampText: 'ยอมเธอหมดใจแล้ว ✨',
  },
  {
    id: 'c4',
    title: 'คูปองคลายเมื่อย สปาส่วนตัว',
    subtitle: 'บริการนวดไหล่ นวดหลัง คลายเครียด',
    detail: 'นวดให้ 30 นาทีเต็ม พร้อมเปิดเพลงเพราะๆ ให้ผ่อนคลาย',
    icon: <Smile className="w-6 h-6 text-purple-500" />,
    color: 'from-purple-100 to-pink-100 border-purple-300',
    stampText: 'ผ่อนคลายสบายใจ 💆‍♀️',
  },
  {
    id: 'c5',
    title: 'คูปองบอดี้การ์ด & คนถือของ',
    subtitle: 'ช้อปปิ้งเดย์ตามใจปาล์มมี่',
    detail: 'พาเดินช้อปปิ้ง ช่วยถือของทุกถุง ขับรถรับส่งอย่างดี',
    icon: <ShoppingBag className="w-6 h-6 text-sky-500" />,
    color: 'from-sky-100 to-blue-100 border-sky-300',
    stampText: 'พร้อมรับใช้เสมอ 🛍️',
  },
  {
    id: 'c6',
    title: 'คูปองคำขอพิเศษ (Wish Card)',
    subtitle: 'สั่งอะไรก็ได้ 1 อย่าง',
    detail: 'ไม่ว่าจะขออะไร เค้าจะพยายามทำให้สำเร็จสุดความสามารถ!',
    icon: <Sparkles className="w-6 h-6 text-fuchsia-500" />,
    color: 'from-fuchsia-100 to-rose-100 border-fuchsia-300',
    stampText: 'สัญญาจะทำให้สำเร็จ 🌟',
  },
];

export const ApologyCoupons: React.FC = () => {
  const [redeemed, setRedeemed] = useState<Record<string, boolean>>({});

  const handleRedeem = (coupon: CouponItem) => {
    if (redeemed[coupon.id]) return;

    setRedeemed((prev) => ({ ...prev, [coupon.id]: true }));
    romanticAudio.playStickerPop();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f472b6', '#ec4899', '#fb7185'],
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-xs font-bold mb-2">
          <Ticket className="w-4 h-4 text-pink-600" />
          <span>LOVE VOUCHERS FOR PALMY</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-900">
          คูปองง้อแฟนสุดพิเศษ 🎟️🎀
        </h3>
        <p className="text-sm text-gray-600 mt-1 max-w-lg mx-auto">
          ปาล์มมี่สามารถกด &ldquo;ใช้คูปอง&rdquo; ได้ตลอดเวลา เค้าพร้อมทำให้ด้วยความเต็มใจและรักที่สุดเลยนะ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEFAULT_COUPONS.map((coupon) => {
          const isUsed = redeemed[coupon.id];
          return (
            <div
              key={coupon.id}
              className={`relative bg-gradient-to-br ${coupon.color} border-2 border-dashed rounded-3xl p-5 shadow-md transition-all hover:shadow-lg flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Ribbon Notch */}
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 bg-white/90 rounded-2xl shadow-sm">
                  {coupon.icon}
                </div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white/70 px-2 py-0.5 rounded-full">
                  VOUCHER #{coupon.id.toUpperCase()}
                </span>
              </div>

              {/* Coupon Info */}
              <div className="my-3 space-y-1">
                <h4 className="font-bold text-gray-900 text-base">{coupon.title}</h4>
                <p className="text-xs text-rose-600 font-semibold">{coupon.subtitle}</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{coupon.detail}</p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">สำหรับ ปาล์มมี่ คนดี</span>
                <button
                  onClick={() => handleRedeem(coupon)}
                  disabled={isUsed}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isUsed
                      ? 'bg-rose-500/20 text-rose-700 cursor-default'
                      : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-300/50 active:scale-95'
                  }`}
                >
                  {isUsed ? 'ใช้คูปองแล้ว ❤️' : 'กดใช้คูปอง 🎁'}
                </button>
              </div>

              {/* REDEEMED STAMP OVERLAY */}
              {isUsed && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center p-4 animate-fadeIn pointer-events-none">
                  <div className="border-4 border-rose-600 text-rose-600 font-extrabold text-sm sm:text-base px-4 py-2 rounded-2xl rotate-[-12deg] tracking-wider shadow-lg bg-white/90 flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-5 h-5 text-rose-600" />
                    <span>{coupon.stampText}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
