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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] border border-[#3c4043] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#9aa0a6] hover:text-white hover:bg-[#2a2a2a] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Install Topit on iPhone & iPad</h3>
            <p className="text-xs text-[#9aa0a6]">Fast Safari PWA Setup (No App Store Needed)</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-[#c4c7c5] mb-6">
          <div className="flex items-start space-x-3 p-3 bg-[#181818] rounded-xl border border-[#2d3033]">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                <span>Tap the Share Button</span>
                <Share className="w-4 h-4 text-blue-400 inline" />
              </div>
              <p className="text-[#9aa0a6] mt-0.5">
                In Safari, tap the <strong className="text-white">Share icon</strong> at the bottom of your iPhone screen.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#181818] rounded-xl border border-[#2d3033]">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                <span>Add to Home Screen</span>
                <PlusSquare className="w-4 h-4 text-blue-400 inline" />
              </div>
              <p className="text-[#9aa0a6] mt-0.5">
                Scroll down in the share menu and tap <strong className="text-white">"Add to Home Screen"</strong>, then tap <strong className="text-emerald-400">Add</strong> in the top right.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#181818] rounded-xl border border-[#2d3033]">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-white font-semibold text-sm flex items-center gap-1.5">
                <span>Launch & Enjoy Full App Experience</span>
                <CheckCircle className="w-4 h-4 text-emerald-400 inline" />
              </div>
              <p className="text-[#9aa0a6] mt-0.5">
                Topit will appear directly on your home screen with full screen mode and push notification support!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full text-sm transition-colors shadow-md"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
