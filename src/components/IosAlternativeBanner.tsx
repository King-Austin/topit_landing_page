import React, { useState, useEffect } from 'react';
import { Apple, ArrowRight } from 'lucide-react';
import { IosGuideModal } from './IosGuideModal';


export const IosAlternativeBanner: React.FC = () => {
  const [isIos, setIsIos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);
  }, []);

  return (
    <>
      <div className="my-3 p-3 bg-gradient-to-r from-[#171b26] to-[#121620] border border-[#2c3e66]/50 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Apple className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{isIos ? 'Visiting on iPhone / iPad?' : 'Using an iOS Device?'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-semibold">Web App (PWA)</span>
            </div>
            <div className="text-[11px] text-[#9aa0a6] truncate">
              Install Topit instantly on iOS without the App Store
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-[#253248] hover:bg-[#31425e] text-blue-300 rounded-full text-xs font-semibold shrink-0 ml-2 transition-colors"
        >
          <span>iOS Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <IosGuideModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
