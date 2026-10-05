/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Sparkles, Music, Github, Cloud, Share2, Award, Calendar } from 'lucide-react';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';
import { ForgivenessGame } from './components/ForgivenessGame';
import { OnlineCardStudio } from './components/OnlineCardStudio';
import { ApologyCoupons } from './components/ApologyCoupons';
import { LovePromises } from './components/LovePromises';
import { EntryOverlay } from './components/EntryOverlay';
import { GitHubModal } from './components/GitHubModal';
import { KittyFace, KittyPinkBow, KittyHeart, KittyRose } from './components/KittyStickers';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Shared card state between Studio and GitHub Exporter
  const [cardState, setCardState] = useState({
    to: 'ปาล์มมี่ สุดที่รัก 🎀',
    from: 'คนสำนึกผิดที่รักเธอที่สุด',
    message: `ถึง ปาล์มมี่ สุดที่รักของเค้า... 🥺\n\nเค้าขอโทษจากใจจริงสำหรับเรื่องที่ทำให้เธอต้องเสียใจหรือคิดมากนะคะ เค้าไม่ได้ตั้งใจเลยจริงๆ เค้าสำนึกผิดแล้ว สัญญาว่าจะรับฟังและใส่ใจปาล์มมี่ให้มากที่สุด จะไม่ทำให้คนดีต้องเสียน้ำตาอีกแล้วนะคะ\n\nตั้งแต่วันแรกที่เราเจอกัน (Day One) ปาล์มมี่คือของขวัญที่ดีที่สุดของเค้าเสมอ ดีกันนะคนเก่ง... รักปาล์มมี่ที่สุดในโลกเลยนะค้าบ ❤️`,
  });

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-gray-800 relative selection:bg-pink-300 selection:text-pink-900 pb-20">
      {/* INITIAL ROMANTIC ENTRY OVERLAY (Plays Day One automatically upon opening) */}
      {!hasEntered && <EntryOverlay onEnter={() => setHasEntered(true)} />}

      {/* FLOATING DECORATIONS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-12 left-6 text-2xl animate-float">🎀</div>
        <div className="absolute top-48 right-8 text-3xl animate-float-delayed">🌸</div>
        <div className="absolute top-96 left-10 text-2xl animate-sway">🍓</div>
        <div className="absolute bottom-32 right-12 text-3xl animate-float">💖</div>
        <div className="absolute bottom-10 left-16 text-2xl animate-sparkle">✨</div>
      </div>

      {/* TOP NAVIGATION / HEADER BAR */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-pink-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KittyPinkBow size={32} className="animate-sway" />
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-pink-700 tracking-tight flex items-center gap-1.5">
                <span>ขอโทษนะคนดี</span>
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
                <span className="text-pink-500 font-semibold hidden sm:inline">For My Palmy</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-medium">Day One &amp; Every Day With You</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เปิดบน</span> GitHub
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 space-y-12">
        {/* HERO ROMANTIC WELCOME SECTION */}
        <section className="pt-8 sm:pt-12 pb-4 text-center px-4 max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center items-center gap-3">
            <div className="relative">
              <KittyFace size={88} className="animate-float" />
              <span className="absolute -top-2 -right-2 text-2xl animate-bounce">🎀</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>แด่ คุณปาล์มมี่ คนที่เค้ารักที่สุด</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-pink-900 tracking-tight leading-tight">
              เค้าขอโทษนะคะคนดี... <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
                ดีกันนะ ปาล์มมี่ 🥺🎀
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
              ขอโทษที่ทำให้ปาล์มมี่ต้องเสียความรู้สึกหรือน้อยใจนะคนดี... <br className="hidden sm:inline" />
              เค้าตั้งใจทำเว็บไซต์นี้ขึ้นมาเพื่อบอกความในใจทั้งหมดให้เธอรู้
            </p>
          </div>

          {/* AUDIO PLAYER WIDGET (DAY ONE - PUN) */}
          <div className="pt-2">
            <AudioPlayerWidget autoPlayStarted={hasEntered} />
          </div>
        </section>

        {/* INTERACTIVE FORGIVENESS GAME SECTION */}
        <section className="px-4">
          <ForgivenessGame />
        </section>

        {/* ONLINE APOLOGY CARD STUDIO WITH STICKERS & GOOGLE DRIVE */}
        <section className="px-4">
          <OnlineCardStudio
            onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
            cardState={cardState}
            setCardState={setCardState}
          />
        </section>

        {/* APOLOGY LOVE COUPONS */}
        <section className="px-4">
          <ApologyCoupons />
        </section>

        {/* REASONS I LOVE PALMY & HEARTFELT PROMISES */}
        <section className="px-4">
          <LovePromises />
        </section>
      </main>

      {/* GITHUB MODAL */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        cardData={cardState}
      />

      {/* ROMANTIC FOOTER */}
      <footer className="mt-20 border-t border-pink-200/80 pt-8 pb-12 text-center text-xs text-gray-500 space-y-2">
        <div className="flex justify-center items-center gap-2">
          <KittyPinkBow size={24} />
          <span className="font-bold text-pink-700">Forever &amp; Always for Palmy</span>
          <KittyPinkBow size={24} />
        </div>
        <p className="text-gray-400">
          เพลง &ldquo;Day One&rdquo; โดย PUN • ออกแบบด้วยความรักและความจริงใจทั้งหมด ❤️
        </p>
      </footer>
    </div>
  );
}
