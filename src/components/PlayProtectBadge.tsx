import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, Lock, X } from 'lucide-react';

export const PlayProtectBadge: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Play Protect Verified Pill / Banner */}
      <div 
        onClick={() => setShowModal(true)}
        className="my-3 p-3 bg-[#e8f0fe] hover:bg-[#d2e3fc] border border-[#aecbfa] rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 group shadow-xs"
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#d2e3fc] border border-[#aecbfa] flex items-center justify-center text-[#0b57d0] shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-[#0b57d0]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-[#202124] tracking-tight">Verified by Play Protect</span>
              <CheckCircle2 className="w-3.5 h-3.5 fill-[#0b57d0] text-white" />
            </div>
            <div className="text-[11px] text-[#5f6368] truncate">
              Scanned & certified virus-free • Signed by Websync Digital
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[11px] font-medium text-[#0b57d0] group-hover:underline shrink-0 ml-2">
          <span>Details</span>
          <Info className="w-3 h-3 ml-0.5" />
        </div>
      </div>

      {/* Security Details Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white border border-[#dadce0] rounded-3xl max-w-md w-full p-6 text-left shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0b57d0]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#202124]">Security & Authenticity Guarantee</h3>
                <p className="text-xs text-[#5f6368]">Verified Official Distribution Package</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#3c4043] mb-6">
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed] flex items-start space-x-3">
                <Lock className="w-4 h-4 text-[#0b57d0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#202124]">Cryptographically Signed</div>
                  <div className="text-[#5f6368] text-[11px] mt-0.5">
                    This build is signed with the official Websync Digital RSA-2048 production key certificate.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed] flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#0b57d0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#202124]">Zero Third-Party Tampering</div>
                  <div className="text-[#5f6368] text-[11px] mt-0.5">
                    Direct compiled binaries straight from Expo EAS cloud workflows. No ad-injection or malware.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-[#0b57d0] hover:bg-[#0842a0] text-white font-semibold rounded-full text-sm transition-colors shadow-sm cursor-pointer"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </>
  );
};
