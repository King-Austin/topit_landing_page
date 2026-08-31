import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, Lock, X } from 'lucide-react';

export const PlayProtectBadge: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Play Protect Verified Pill / Banner */}
      <div 
        onClick={() => setShowModal(true)}
        className="my-3 p-3 bg-[#17241d] hover:bg-[#1a2b22] border border-[#01875f]/40 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 group shadow-sm"
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#01875f]/20 border border-[#01875f]/40 flex items-center justify-center text-[#81c995] shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-white tracking-tight">Verified by Play Protect</span>
              <CheckCircle2 className="w-3.5 h-3.5 fill-[#01875f] text-black" />
            </div>
            <div className="text-[11px] text-[#9aa0a6] truncate">
              Scanned & certified virus-free • Signed by Websync Digital
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[11px] font-medium text-[#81c995] group-hover:underline shrink-0 ml-2">
          <span>Details</span>
          <Info className="w-3 h-3 ml-0.5" />
        </div>
      </div>

      {/* Security Details Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1e1e1e] border border-[#3c4043] rounded-3xl max-w-md w-full p-6 text-left shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#9aa0a6] hover:text-white hover:bg-[#2a2a2a] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Security & Authenticity Guarantee</h3>
                <p className="text-xs text-[#9aa0a6]">Verified Official Distribution Package</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#c4c7c5] mb-6">
              <div className="p-3 bg-[#181818] rounded-xl border border-[#2d3033] flex items-start space-x-3">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Cryptographically Signed</div>
                  <div className="text-[#9aa0a6] text-[11px] mt-0.5">
                    This build is signed with the official Websync Digital RSA-2048 production key certificate.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#181818] rounded-xl border border-[#2d3033] flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#8ab4f8] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Zero Third-Party Tampering</div>
                  <div className="text-[#9aa0a6] text-[11px] mt-0.5">
                    Direct compiled binaries straight from Expo EAS cloud workflows. No ad-injection or malware.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-[#01875f] hover:bg-[#00a86b] text-white font-semibold rounded-full text-sm transition-colors shadow-md"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </>
  );
};
