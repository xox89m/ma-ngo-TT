import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Heart,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tv,
  RotateCcw
} from 'lucide-react';
import { KittyPinkBow } from './KittyStickers';

interface AudioPlayerWidgetProps {
  autoPlayStarted?: boolean;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({ autoPlayStarted = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(90);
  const [showVideo, setShowVideo] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send message to YouTube iframe
  const postToYT = (func: string, args: unknown = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: func,
          args: args,
        }),
        '*'
      );
    }
  };

  useEffect(() => {
    if (autoPlayStarted) {
      setAudioStarted(true);
      setIsPlaying(true);
      // Ensure it starts playing and unmuted
      setTimeout(() => {
        postToYT('unMute');
        postToYT('setVolume', [90]);
        postToYT('playVideo');
      }, 500);
      setTimeout(() => {
        postToYT('unMute');
        postToYT('playVideo');
      }, 1500);
    }
  }, [autoPlayStarted]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      postToYT('pauseVideo');
      setIsPlaying(false);
    } else {
      setAudioStarted(true);
      postToYT('unMute');
      postToYT('playVideo');
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      postToYT('unMute');
      setIsMuted(false);
    } else {
      postToYT('mute');
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    postToYT('setVolume', [val]);
    if (val > 0 && isMuted) {
      postToYT('unMute');
      setIsMuted(false);
    }
  };

  const handleRestart = () => {
    postToYT('seekTo', [0, true]);
    postToYT('unMute');
    postToYT('playVideo');
    setIsPlaying(true);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border-3 border-pink-300 rounded-3xl p-4 sm:p-5 shadow-xl shadow-pink-200/60 max-w-lg mx-auto transition-all relative overflow-hidden">
      {/* Decorative Kitty Ribbon */}
      <div className="absolute -top-3 -right-3 pointer-events-none">
        <KittyPinkBow size={40} />
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Animated Vinyl / Tape */}
          <div className="relative w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
            <div
              className={`w-9 h-9 rounded-full border-2 border-white/80 border-dashed flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '3.5s' }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="absolute -bottom-1 -right-1 text-xs">🎵</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Music className="w-3 h-3 text-rose-500" />
                DAY ONE (STRIPPED)
              </span>
              <span className="text-xs text-pink-600 font-bold">PUN (ปัญ)</span>
            </div>
            <h4 className="text-sm font-extrabold text-gray-800 flex items-center gap-1 mt-0.5">
              <span>เพลงพิเศษเปิดให้ปาล์มมี่ฟัง</span>
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            </h4>
          </div>
        </div>

        {/* Big Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer ${
            isPlaying
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-300'
              : 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-300 animate-pulse-slow'
          }`}
          title={isPlaying ? 'หยุดชั่วคราว' : 'กดเล่นเพลง Day One'}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </button>
      </div>

      {/* Unmute / Play Prompt if not yet heard */}
      {!isPlaying && (
        <div className="mb-3 bg-pink-100/90 border border-pink-300 rounded-2xl p-2.5 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-600 animate-spin" />
          <span className="text-xs font-bold text-pink-900">
            แตะปุ่มสีชมพูด้านบนเพื่อฟังเพลง <strong>Day One (Stripped) - PUN</strong> ได้ทันทีค่ะ 🎶
          </span>
        </div>
      )}

      {/* EMBEDDED YOUTUBE PLAYER CONTAINER */}
      <div
        className={`relative rounded-2xl overflow-hidden border-2 border-pink-200 bg-black transition-all ${
          showVideo ? 'h-48 sm:h-56 my-3' : 'h-0 opacity-0 overflow-hidden'
        }`}
      >
        <iframe
          ref={iframeRef}
          id="youtube-day-one"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Fj-E_L_0m38?enablejsapi=1&autoplay=1&playsinline=1&rel=0&iv_load_policy=3&modestbranding=1"
          title="PUN - DAY ONE (STRIPPED)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        ></iframe>
      </div>

      {/* CONTROLS BAR: Volume, Restart, Toggle Video, Toggle Lyrics */}
      <div className="pt-2 border-t border-pink-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Volume & Sound */}
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <button
            onClick={handleToggleMute}
            className="text-pink-600 hover:text-pink-800 p-1 rounded-lg"
            title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-pink-600" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRestart}
            className="p-1.5 text-gray-500 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            title="เริ่มเพลงใหม่"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowVideo(!showVideo)}
            className="flex items-center gap-1 px-2.5 py-1 text-gray-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors font-semibold"
          >
            <Tv className="w-3.5 h-3.5 text-pink-500" />
            <span>{showVideo ? 'ซ่อนวิดีโอ' : 'ดู MV'}</span>
          </button>

          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className="flex items-center gap-1 px-2.5 py-1 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>เนื้อเพลง</span>
            {showLyrics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* LYRICS MODAL / PANEL */}
      {showLyrics && (
        <div className="mt-3 p-4 bg-pink-50 rounded-2xl border border-pink-200 text-xs text-pink-950 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-pink-800">
            <span>🎤 เนื้อเพลง Day One - PUN (ท่อนที่มีความหมายถึงปาล์มมี่)</span>
            <a
              href="https://www.youtube.com/watch?v=Fj-E_L_0m38"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 underline flex items-center gap-1 text-[11px]"
            >
              เปิดบน YouTube <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="p-3 bg-white/90 rounded-xl border border-pink-100 text-gray-700 leading-relaxed font-sans space-y-1.5">
            <p className="font-semibold text-rose-600">&ldquo;เธอคือคนเดียวที่อยู่ข้างกันตั้งแต่วันแรก...</p>
            <p>I&apos;ll be there from day one to the end of time</p>
            <p>ขอบคุณทุกความทรงจำดีๆ ที่มีให้กัน</p>
            <p className="italic text-pink-700">และขอโทษจากใจที่ทำให้เธอเสียใจนะคะ... ดีกันนะปาล์มมี่ ❤️&rdquo;</p>
          </div>
        </div>
      )}
    </div>
  );
};
