import React, { useState } from 'react';
import { Github, Globe, Copy, Check, ExternalLink, Code, Sparkles, X, ArrowRight, AlertTriangle, Download, HelpCircle } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'standalone' | 'workflow'>('standalone');

  if (!isOpen) return null;

  // Generate complete, self-contained standalone HTML with Day One - PUN music, Hello Kitty styling, and interactive buttons
  const generateGitHubPagesHTML = () => {
    const escapedMsg = (cardData.message || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

    const toName = cardData.to || 'ปาล์มมี่';
    const fromName = cardData.from || 'คนสำนึกผิดที่รักปาล์มมี่ที่สุด';

    return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ขอโทษนะคนดี - For My ${toName} 🎀</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Mali', cursive, sans-serif;
      background: linear-gradient(135deg, #FFF5F7 0%, #FFE4E9 100%);
      color: #374151;
      min-height: 100vh;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
      background: #FFFFFF;
      border: 4px solid #F472B6;
      border-radius: 28px;
      padding: 28px;
      box-shadow: 0 20px 40px rgba(244, 114, 182, 0.25);
      text-align: center;
      margin: 20px auto;
    }
    .badge {
      display: inline-block;
      background: #FCE7F3;
      color: #DB2777;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 26px;
      color: #831843;
      margin-bottom: 8px;
    }
    .letter-box {
      background: #FFF1F2;
      border: 2px dashed #FB7185;
      border-radius: 20px;
      padding: 20px;
      text-align: left;
      color: #881337;
      line-height: 1.8;
      font-size: 15px;
      margin: 20px 0;
    }
    .from-box {
      text-align: right;
      font-size: 14px;
      font-weight: 700;
      color: #BE185D;
      margin-bottom: 20px;
    }
    .music-card {
      background: #FDF2F8;
      border: 2px solid #FBCFE8;
      border-radius: 20px;
      padding: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .music-title {
      font-weight: 700;
      color: #BE185D;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .btn-yes {
      background: linear-gradient(135deg, #EC4899, #F43F5E);
      color: #FFFFFF;
      border: none;
      padding: 14px 28px;
      font-size: 17px;
      font-weight: 700;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 10px 20px rgba(244, 63, 94, 0.3);
      transition: all 0.2s;
    }
    .btn-yes:hover {
      transform: scale(1.05);
    }
    .btn-no {
      background: #F3F4F6;
      color: #4B5563;
      border: 1px solid #D1D5DB;
      padding: 10px 20px;
      font-size: 13px;
      border-radius: 9999px;
      cursor: pointer;
      margin-top: 12px;
      transition: all 0.2s;
    }
    .video-wrap {
      border-radius: 16px;
      overflow: hidden;
      margin: 12px 0;
      background: #000;
    }
    .forgiven-box {
      display: none;
      background: #F0FDF4;
      border: 2px dashed #4ADE80;
      border-radius: 20px;
      padding: 20px;
      color: #166534;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div style="font-size: 42px; margin-bottom: 8px;">🎀 🐱 💖</div>
    <div class="badge">จดหมายง้อแฟนฉบับพิเศษ</div>
    <h1>ขอโทษนะคนดี... ${toName} 🥺</h1>
    <p style="color: #6B7280; font-size: 14px;">เค้าสำนึกผิดแล้วจริงๆ สัญญาว่าจะรักและดูแลเธอให้ดีที่สุด</p>

    <!-- MUSIC PLAYER FOR DAY ONE - PUN -->
    <div class="music-card">
      <div class="music-title">🎵 เพลงแทนใจ: PUN - DAY ONE</div>
      <div class="video-wrap">
        <iframe width="100%" height="220" src="https://www.youtube.com/embed/k_l7k0h3X1Y?autoplay=1&playsinline=1" title="PUN - DAY ONE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <p style="font-size: 12px; color: #DB2777;">(กดเตรงนี้ล่นเพลง 🎶)</p>
    </div>

    <!-- HEARTFELT APOLOGY LETTER -->
    <div class="letter-box">
      ${escapedMsg}
    </div>

    <div class="from-box">
      จาก: ${fromName} ❤️
    </div>

    <!-- INTERACTIVE FORGIVENESS BUTTONS -->
    <div id="btn-group">
      <button id="yes-btn" class="btn-yes" onclick="handleForgive()">
        ยกโทษให้แล้วนะ 🥰❤️
      </button>
      <br/>
      <button id="no-btn" class="btn-no" onclick="handlePlea()" onmouseover="handlePlea()">
        ยังไม่หายงอนหรอก 😤
      </button>
    </div>

    <!-- CERTIFICATE DISPLAY UPON FORGIVENESS -->
    <div id="forgiven-box" class="forgiven-box">
      <h2 style="font-size: 20px; color: #15803D; margin-bottom: 6px;">🎉 เย้!! คุณปาล์มมี่ยกโทษให้แล้ว 💖</h2>
      <p style="font-size: 14px;">ขอบคุณนะคะคนดี เค้าสัญญาจะเป็นเด็กดี ไม่ทำให้ปาล์มมี่เสียใจอีกแล้วค่ะ! ✨</p>
    </div>
  </div>

  <script>
    var pleas = [
      'ยอมเลี้ยงชานมไข่มุก 10 แก้วเลย 🧋',
      'ยอมให้ตีเบาๆ 3 ทีเลย 😿',
      'เค้าสัญญาจะเป็นแฟนที่ดีที่สุด 🤞',
      'คิดถึงรอยยิ้มของปาล์มมี่ที่สุด 😭',
      'กดปุ่มสีชมพูด้านบนเถอะนะคนดี 🥺'
      'เทอออย่าทำงี้ คืนดีกันน้าา',
    ];
    var pIdx = 0;
    var scale = 1;

    function handlePlea() {
      var noBtn = document.getElementById('no-btn');
      var yesBtn = document.getElementById('yes-btn');
      noBtn.innerText = pleas[pIdx % pleas.length];
      pIdx++;
      scale = Math.min(1.4, scale + 0.08);
      yesBtn.style.transform = 'scale(' + scale + ')';
    }

    function handleForgive() {
      document.getElementById('btn-group').style.display = 'none';
      document.getElementById('forgiven-box').style.display = 'block';
      if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
    }
  </script>
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-4 border-pink-300 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-pink-100 pb-4 mb-4">
          <div className="p-3 bg-gray-900 text-white rounded-2xl shadow-md">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <span>เปิดเว็บไซต์บน GitHub Pages</span>
              <KittyPinkBow size={28} />
            </h3>
            <p className="text-xs text-gray-500">
              แชร์เว็บง้อแฟนให้คุณปาล์มมี่เปิดอ่านได้ทุกที่ผ่าน GitHub Pages
            </p>
          </div>
        </div>

        {/* WHITE SCREEN EXPLANATION BANNER */}
        <div className="mb-5 bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>ทำไมเปิดบน GitHub แล้วหน้าจอถึงเป็นสีขาว?</span>
          </div>
          <p className="leading-relaxed">
            GitHub Pages เป็นเว็บเซิร์ฟเวอร์แบบ static ซึ่ง<strong>ไม่สามารถรันไฟล์ TypeScript (.tsx)</strong> หรือโค้ด source code ตรงๆ ได้ หากอัปโหลดโค้ดทั้งหมดขึ้นไปโดยไม่ผ่านการ build เบราว์เซอร์จะโหลดสคริปต์ไม่ผ่านและแสดงหน้าสีขาว
          </p>
          <p className="font-bold text-amber-950">
            👉 วิธีแก้ที่ง่ายและเร็วที่สุด (ใน 1 นาที): ใช้ไฟล์ <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">index.html</code> สำเร็จรูปด้านล่างนี้ได้เลย จะเปิดได้ 100% ทันที มีเพลง Day One และเอฟเฟกต์ครบถ้วน!
          </p>
        </div>

        {/* TABS */}
        <div className="flex bg-gray-100 p-1 rounded-2xl text-xs font-bold mb-4">
          <button
            onClick={() => setActiveTab('standalone')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'standalone' ? 'bg-white text-pink-700 shadow-sm' : 'text-gray-600'
            }`}
          >
            วิธีที่ 1: ไฟล์ index.html สำเร็จรูป (แนะนำ) ✨
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'workflow' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            วิธีที่ 2: GitHub Actions (Build อัตโนมัติ) ⚙️
          </button>
        </div>

        {activeTab === 'standalone' ? (
          <div className="space-y-4">
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 space-y-3 text-xs sm:text-sm text-gray-700">
              <h4 className="font-bold text-pink-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span>ขั้นตอนลงไฟล์ index.html บน GitHub Pages:</span>
              </h4>
              <ol className="space-y-2 list-decimal list-inside leading-relaxed">
                <li>
                  กดปุ่ม <strong>&ldquo;ดาวน์โหลด index.html&rdquo;</strong> ด้านล่าง
                </li>
                <li>
                  ไปที่ GitHub สร้าง Repository ใหม่ (เช่น <code className="font-mono bg-white px-1 border rounded">for-palmy</code>)
                </li>
                <li>
                  กด <strong>Add file &gt; Upload files</strong> แล้วลากไฟล์ <code className="font-mono bg-white px-1 border rounded">index.html</code> ที่ดาวน์โหลดไปใส่
                </li>
                <li>
                  ไปที่ <strong>Settings &gt; Pages &gt; Branch: main &gt; Save</strong>
                </li>
              </ol>
              <div className="p-2.5 bg-white rounded-xl border border-pink-200 text-pink-700 font-semibold text-xs">
                🎉 ได้ลิงก์เปิดเว็บทันที: <code className="font-mono text-pink-900">https://yourusername.github.io/for-palmy</code>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadHTML}
                className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-pink-200 transition-all cursor-pointer text-sm"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลด index.html ทันที</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all cursor-pointer text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'คัดลอกโค้ดสำเร็จแล้ว!' : 'คัดลอกโค้ด HTML ทั้งหมด'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-gray-900">🚀 ไฟล์ GitHub Actions Deploy Workflow</h4>
              <p>
                ในโปรเจกต์นี้เราได้สร้างไฟล์ <code className="bg-white px-1.5 py-0.5 rounded border font-mono">.github/workflows/deploy.yml</code> ไว้ให้เรียบร้อยแล้ว
              </p>
              <p>
                เมื่อคุณ Push โค้ดทั้งหมดขึ้น GitHub ให้ไปที่ <strong>Settings &gt; Pages &gt; Source: GitHub Actions</strong> ตัวระบบจะรัน build และ deploy หน้าเว็บให้อัตโนมัติโดยที่หน้าจอไม่ขาวอีกต่อไปครับ!
              </p>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl transition-colors font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>สร้าง Repository ใหม่บน GitHub</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>

          <a
            href="https://gist.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl transition-colors font-semibold"
          >
            <Code className="w-4 h-4" />
            <span>สร้าง GitHub Gist</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>
        </div>

        {/* Test Link Preview Box */}
        <div className="mt-4 p-3 bg-pink-50/50 rounded-2xl border border-pink-200 space-y-2">
          <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-pink-500" />
            <span>ทดสอบเปิดลิงก์ GitHub Pages ที่แชร์ให้ปาล์มมี่:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://yourusername.github.io/for-palmy"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono"
            />
            <button
              disabled={!testUrl}
              onClick={() => {
                if (testUrl) {
                  window.open(testUrl.startsWith('http') ? testUrl : `https://${testUrl}`, '_blank');
                }
              }}
              className="bg-pink-600 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-pink-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span>เปิดเว็บ</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
