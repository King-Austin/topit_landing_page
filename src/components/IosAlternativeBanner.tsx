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
      <div className="my-3 p-3 bg-[#e8f0fe]/60 border border-[#aecbfa] rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#d2e3fc] border border-[#aecbfa] flex items-center justify-center text-[#0b57d0] shrink-0">
            <Apple className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
              <span>{isIos ? 'Visiting on iPhone / iPad?' : 'Using an iOS Device?'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0b57d0]/10 text-[#0b57d0] font-semibold">Web App (PWA)</span>
            </div>
            <div className="text-[11px] text-[#5f6368] truncate">
              Install Topit instantly on iOS without the App Store
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-[#0b57d0] hover:bg-[#0842a0] text-white rounded-full text-xs font-semibold shrink-0 ml-2 transition-colors cursor-pointer shadow-xs"
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
