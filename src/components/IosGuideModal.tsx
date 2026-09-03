import React from 'react';
import { X, Share, PlusSquare, Smartphone, CheckCircle } from 'lucide-react';

interface IosGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IosGuideModal: React.FC<IosGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#dadce0] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#0b57d0]">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#202124]">Install Topit on iPhone & iPad</h3>
            <p className="text-xs text-[#5f6368]">Fast Safari PWA Setup (No App Store Needed)</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-[#3c4043] mb-6">
          <div className="flex items-start space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <div className="w-6 h-6 rounded-full bg-[#0b57d0] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-[#202124] font-semibold text-sm flex items-center gap-1.5">
                <span>Tap the Share Button</span>
                <Share className="w-4 h-4 text-[#0b57d0] inline" />
              </div>
              <p className="text-[#5f6368] mt-0.5">
                In Safari, tap the <strong className="text-[#202124]">Share icon</strong> at the bottom of your iPhone screen.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <div className="w-6 h-6 rounded-full bg-[#0b57d0] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-[#202124] font-semibold text-sm flex items-center gap-1.5">
                <span>Add to Home Screen</span>
                <PlusSquare className="w-4 h-4 text-[#0b57d0] inline" />
              </div>
              <p className="text-[#5f6368] mt-0.5">
                Scroll down in the share menu and tap <strong className="text-[#202124]">"Add to Home Screen"</strong>, then tap <strong className="text-[#0b57d0]">Add</strong> in the top right.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <div className="w-6 h-6 rounded-full bg-[#0b57d0] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-[#202124] font-semibold text-sm flex items-center gap-1.5">
                <span>Launch & Enjoy Full App Experience</span>
                <CheckCircle className="w-4 h-4 text-[#0b57d0] inline" />
              </div>
              <p className="text-[#5f6368] mt-0.5">
                Topit will appear directly on your home screen with full screen mode and push notification support!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#0b57d0] hover:bg-[#0842a0] text-white font-semibold rounded-full text-sm transition-colors shadow-sm cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
