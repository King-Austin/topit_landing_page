import React, { useState } from 'react';
import { ShieldCheck, Lock, Share2, Trash2, ArrowRight } from 'lucide-react';


export const DataSafetyCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="my-6 border-b border-[#e8eaed] pb-6">
      {/* Header */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-between group py-2 text-left"
      >
        <h2 className="text-lg font-bold text-[#202124] group-hover:text-[#0b57d0] flex items-center transition-colors">
          Data safety
        </h2>
        <div className="p-1 rounded-full text-[#5f6368] group-hover:text-[#202124] group-hover:translate-x-0.5 transition-all">
          <ArrowRight className="w-5 h-5" />
        </div>
      </button>

      <p className="text-xs text-[#5f6368] mt-1 mb-4 leading-relaxed">
        Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use and region.
      </p>

      {/* Highlights Box */}
      <div className="p-4 bg-[#f8f9fa] rounded-xl border border-[#e8eaed] space-y-3.5 text-xs text-[#3c4043]">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 rounded-lg bg-[#e8f0fe] text-[#0b57d0] shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[#202124] font-medium">No data shared with third parties</div>
            <div className="text-[#5f6368] text-[11px] mt-0.5">
              The developer says this app doesn't share user data with other companies or organizations.
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-1.5 rounded-lg bg-[#e8f0fe] text-[#0b57d0] shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[#202124] font-medium">Data is encrypted in transit</div>
            <div className="text-[#5f6368] text-[11px] mt-0.5">
              Your data is transferred over a secure, hardware-backed 256-bit TLS connection.
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-1.5 rounded-lg bg-[#e8f0fe] text-[#0b57d0] shrink-0">
            <Trash2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[#202124] font-medium">You can request that data be deleted</div>
            <div className="text-[#5f6368] text-[11px] mt-0.5">
              The developer provides a way for you to request that your account data be deleted.
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-3 text-xs font-semibold text-[#0b57d0] hover:text-[#0842a0] hover:underline cursor-pointer"
      >
        See details
      </button>

      {/* Safety Details Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white border border-[#dadce0] rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2 text-[#0b57d0] mb-2">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#202124]">Topit Data Safety Policy</h3>
            </div>
            <p className="text-xs text-[#5f6368] mb-4">
              Websync Digital is dedicated to financial privacy and complies with NDPR and international encryption standards.
            </p>

            <div className="space-y-3 text-xs text-[#3c4043] max-h-60 overflow-y-auto pr-1">
              <div className="p-2.5 bg-[#f8f9fa] border border-[#e8eaed] rounded-lg">
                <div className="font-semibold text-[#202124]">Data Collected</div>
                <div className="text-[#5f6368] mt-0.5">Name, email, phone number, and transaction logs for VTU receipt generation.</div>
              </div>
              <div className="p-2.5 bg-[#f8f9fa] border border-[#e8eaed] rounded-lg">
                <div className="font-semibold text-[#202124]">Security Practices</div>
                <div className="text-[#5f6368] mt-0.5">Biometric auth, tokenized API calls, and automated PIN validation.</div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-2.5 bg-[#0b57d0] hover:bg-[#0842a0] text-white font-semibold rounded-full text-sm transition-colors shadow-sm cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
