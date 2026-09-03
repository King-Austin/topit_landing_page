import React from 'react';
import { X, ShieldCheck, Download, AlertTriangle } from 'lucide-react';


interface ApkInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  version: string;
}

export const ApkInstallGuideModal: React.FC<ApkInstallGuideModalProps> = ({
  isOpen,
  onClose,
  onDownload,
  version
}) => {
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#0b57d0]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#202124]">How to Install Topit APK</h3>
            <p className="text-xs text-[#5f6368]">Simple 3-step setup on any Android device</p>
          </div>
        </div>

        {/* Note banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-5 flex items-start space-x-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-800">Safe Official Build:</span> Android displays a standard warning for apps downloaded outside the Play Store. Topit is 100% virus-free and verified.
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs text-[#3c4043]">
          {/* Step 1 */}
          <div className="flex items-start space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <div className="w-6 h-6 rounded-full bg-[#0b57d0] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-[#202124] font-semibold text-sm">Download the APK File</div>
              <p className="text-[#5f6368] mt-0.5">
                Tap the <strong className="text-[#0b57d0]">"Install"</strong> button. If Chrome or your browser asks <em>"File might be harmful?"</em>, tap <strong className="text-[#202124]">Download anyway</strong>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <div className="w-6 h-6 rounded-full bg-[#0b57d0] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-[#202124] font-semibold text-sm">Open the Downloaded File</div>
              <p className="text-[#5f6368] mt-0.5">
                Once downloaded, tap the notification in your status bar or open your device's <strong>Files / Downloads</strong> folder and tap <strong className="text-[#202124]">topit-v{version}.apk</strong>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <div className="w-6 h-6 rounded-full bg-[#0b57d0] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-[#202124] font-semibold text-sm">Allow Unknown Sources & Install</div>
              <p className="text-[#5f6368] mt-0.5">
                If prompted, tap <strong className="text-[#202124]">Settings</strong> $\rightarrow$ switch on <strong className="text-[#202124]">"Allow from this source"</strong> $\rightarrow$ tap <strong className="text-[#0b57d0]">Install</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              onClose();
              onDownload();
            }}
            className="flex-1 py-3 bg-[#0b57d0] hover:bg-[#0842a0] text-white font-semibold rounded-full text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download APK Now</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-3 bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#3c4043] font-medium rounded-full text-sm transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
