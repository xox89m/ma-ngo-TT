import React, { useState } from 'react';
import { Github, Globe, Copy, Check, ExternalLink, Code, Sparkles, X, ArrowRight } from 'lucide-react';
import { KittyPinkBow } from './KittyStickers';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: {
    to: string;
    from: string;
    message: string;
  };
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose, cardData }) => {
  const [copied, setCopied] = useState(false);
  const [testUrl, setTestUrl] = useState('');

  if (!isOpen) return null;

  // Generate self-contained HTML file for GitHub Pages
  const generateGitHubPagesHTML = () => {
    return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ขอโทษนะคนดี - For My ${cardData.to || 'ปาล์มมี่'} 🎀</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Mali', cursive, sans-serif; background: #FFF5F7; }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    .animate-float { animation: float 3s ease-in-out infinite; }
  </style>
</head>
<body class="min-h-screen p-4 flex flex-col items-center justify-center text-gray-800">
  <div class="max-w-xl w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-pink-300 shadow-2xl text-center space-y-6">
    <div class="text-4xl animate-bounce">🎀 🐱 💖</div>
    <h1 class="text-2xl sm:text-3xl font-bold text-pink-600">ขอโทษนะคนดี... ${cardData.to || 'ปาล์มมี่'} 🥺</h1>
    <div class="p-6 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-300 text-left text-pink-900 leading-relaxed whitespace-pre-line text-sm sm:text-base">
${cardData.message}
    </div>
    <p class="text-xs text-rose-500 font-bold">จาก: ${cardData.from || 'คนสำนึกผิดที่รักปาล์มมี่ที่สุด'}</p>
    <div class="pt-4 flex flex-col gap-3">
      <button onclick="confetti({particleCount: 100, spread: 70, origin: {y: 0.6}}); alert('ขอบคุณที่ยกโทษให้เค้านะคะ! สัญญาจะเป็นแฟนที่ดีที่สุด ❤️');"
        class="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-pink-200 transition-all cursor-pointer">
        ยกโทษให้แล้วนะ 🥰❤️
      </button>
      <a href="https://www.youtube.com/results?search_query=Day+One+PUN" target="_blank"
        class="text-xs text-pink-600 hover:underline">
        🎵 ฟังเพลง Day One - PUN เพื่อปาล์มมี่
      </a>
    </div>
  </div>
</body>
</html>`;
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateGitHubPagesHTML());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      console.warn('Clipboard write failed');
    }
  };

  const handleDownloadHTML = () => {
    const content = generateGitHubPagesHTML();
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-4 border-pink-200 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-pink-100 pb-4 mb-5">
          <div className="p-3 bg-gray-900 text-white rounded-2xl shadow-md">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <span>เชื่อมต่อ GitHub & เปิดเว็บไซต์</span>
              <KittyPinkBow size={28} />
            </h3>
            <p className="text-xs text-gray-500">
              นำเว็บไซต์ง้อแฟนนี้ไปเปิดใช้งานบน GitHub Pages ฟรี ให้ปาล์มมี่กดเปิดอ่านได้ทุกที่ทุกเวลา!
            </p>
          </div>
        </div>

        {/* 3 Easy Steps */}
        <div className="space-y-4">
          <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-bold text-pink-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>3 ขั้นตอนเปิดเว็บไซต์ผ่าน GitHub Pages (ฟรี 100%):</span>
            </h4>
            <ol className="text-xs sm:text-sm text-gray-700 space-y-2.5 list-decimal list-inside">
              <li>
                <strong className="text-gray-900">ดาวน์โหลดไฟล์เว็บ</strong>: กดปุ่มดาวน์โหลดไฟล์{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border border-pink-200 text-pink-700 font-mono">
                  index.html
                </code>{' '}
                ด้านล่าง
              </li>
              <li>
                <strong className="text-gray-900">สร้าง Repo บน GitHub</strong>: ไปที่ GitHub สร้าง Repository ชื่อ{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border border-pink-200 text-pink-700 font-mono">
                  for-palmy
                </code>{' '}
                แล้วอัปโหลดไฟล์ index.html ขึ้นไป
              </li>
              <li>
                <strong className="text-gray-900">เปิด GitHub Pages</strong>: ไปที่เมนู Settings &gt; Pages &gt; เลือก Branch: main &gt; Save
              </li>
            </ol>
            <p className="text-xs text-pink-600 font-medium">
              ✨ เว็บไซต์จะเปิดให้เข้าชมได้ทันทีที่:{' '}
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-pink-200">
                https://username.github.io/for-palmy
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadHTML}
              className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-2xl shadow-md shadow-pink-200 transition-all cursor-pointer text-sm"
            >
              <Code className="w-4 h-4" />
              <span>ดาวน์โหลดไฟล์ index.html</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกโค้ดสำเร็จแล้ว!' : 'คัดลอกโค้ด HTML ทั้งหมด'}</span>
            </button>
          </div>

          {/* Direct GitHub Links */}
          <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-xl transition-colors font-medium"
            >
              <Github className="w-3.5 h-3.5" />
              <span>ไปที่หน้าสร้าง Repo บน GitHub</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>

            <a
              href="https://gist.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-xl transition-colors font-medium"
            >
              <Code className="w-3.5 h-3.5" />
              <span>หรือสร้าง GitHub Gist</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>
          </div>

          {/* Test Link Preview Box */}
          <div className="mt-4 p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-pink-500" />
              <span>ทดสอบเปิดลิงก์ GitHub / GitHub Pages ของคุณ:</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://yourusername.github.io/for-palmy"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono"
              />
              <button
                disabled={!testUrl}
                onClick={() => {
                  if (testUrl) {
                    window.open(testUrl.startsWith('http') ? testUrl : `https://${testUrl}`, '_blank');
                  }
                }}
                className="bg-gray-900 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>เปิดเว็บ</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
