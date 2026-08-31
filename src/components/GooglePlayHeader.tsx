import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Share2, ShieldCheck, DownloadCloud } from 'lucide-react';


interface GooglePlayHeaderProps {
  onDownloadClick: () => void;
  onGuideClick: () => void;
}

export const GooglePlayHeader: React.FC<GooglePlayHeaderProps> = ({ onDownloadClick, onGuideClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Topit: Instant VTU, Airtime & Bills Payment',
          text: 'Download Topit Android APK for instant airtime, cheap data bundles, electricity tokens, and cable subscriptions!',
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-[#222] transition-all">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Back Arrow & Google Play branding badge */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 -ml-2 rounded-full text-[#c4c7c5] hover:text-white hover:bg-[#282a2c] active:bg-[#333] transition-colors"
            title="Back to Top"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.03 2.03 0 0 1-.22-.962V2.776c0-.36.08-.693.22-.962z" fill="#00E676" />
              <path d="M17.186 8.607l-3.394 3.393 3.394 3.393 3.842-2.187a1.35 1.35 0 0 0 0-2.412l-3.842-2.187z" fill="#FFD600" />
              <path d="M3.609 1.814L13.792 12l3.394-3.393L5.033 1.879a1.644 1.644 0 0 0-1.424-.065z" fill="#00B0FF" />
              <path d="M13.792 12L3.609 22.186c.412.228.922.203 1.424-.065l12.153-6.728L13.792 12z" fill="#FF3D00" />
            </svg>
            <span className="text-sm font-medium tracking-tight text-[#e3e3e3] hidden sm:inline-block">Google Play</span>
          </div>
        </div>

        {/* Right: Search, Share, Quick APK action, Kebab Menu */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#8ab4f8] hover:bg-[#8ab4f8]/10 active:bg-[#8ab4f8]/20 transition-colors"
            title="Share app link"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden xs:inline">{copied ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={onGuideClick}
            className="p-2 rounded-full text-[#c4c7c5] hover:text-white hover:bg-[#282a2c] transition-colors"
            title="Installation Guide"
            aria-label="Installation Guide"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </button>

          <button
            onClick={onDownloadClick}
            className="hidden md:flex items-center space-x-1.5 bg-[#01875f] hover:bg-[#00a86b] text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-md active:scale-95"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Install APK</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full text-[#c4c7c5] hover:text-white hover:bg-[#282a2c] transition-colors"
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-[#28292a] border border-[#3c4043] rounded-xl shadow-2xl py-1.5 z-40 text-sm animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDownloadClick();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#353739] text-[#e3e3e3] flex items-center space-x-2.5"
                  >
                    <DownloadCloud className="w-4 h-4 text-[#01875f]" />
                    <span>Download APK v1.0.0</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onGuideClick();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#353739] text-[#e3e3e3] flex items-center space-x-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Installation Instructions</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      handleShare();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#353739] text-[#e3e3e3] flex items-center space-x-2.5"
                  >
                    <Share2 className="w-4 h-4 text-[#8ab4f8]" />
                    <span>Share App</span>
                  </button>
                  <a
                    href="mailto:support@websyncdigital.com"
                    className="w-full text-left px-4 py-2.5 hover:bg-[#353739] text-[#9aa0a6] hover:text-[#e3e3e3] block"
                    onClick={() => setShowMenu(false)}
                  >
                    Flag as inappropriate
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
