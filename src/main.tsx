import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean; error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border-4 border-pink-300 shadow-2xl space-y-4">
            <div className="text-5xl animate-bounce">🎀 🥺 💖</div>
            <h1 className="text-xl font-bold text-pink-700">ขออภัยน้าคนดี กำลังรีเฟรชหน้าใหม่อัตโนมัติ</h1>
            <p className="text-xs text-gray-500">
              {this.state.error?.message || 'เกิดข้อผิดพลาดในการโหลด กรุณากดปุ่มด้านล่างเพื่อเริ่มใหม่'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md transition-all cursor-pointer"
            >
              โหลดหน้าเว็บใหม่อีกครั้ง
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

