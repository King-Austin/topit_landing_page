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
          title: 'Topit: Instant Data, Airtime & Rewards',
          text: 'Download Topit Android APK for instant airtime top-ups, cheap data bundles, 0.5% cashback, and automated renewals for MTN, Airtel, and Glo!',
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
            <img src="/splash-icon-white.png" alt="Topit" className="w-9 h-9 rounded-md object-cover border border-white/10" />
            <span className="text-sm font-bold tracking-tight text-[#e3e3e3] inline-block">Topit</span>
          </div>
        </div>

        {/* Right: Search, Share, Quick APK action, Kebab Menu */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#8ab4f8] hover:bg-[#8ab4f8]/10 active:bg-[#8ab4f8]/20 transition-colors"
            title="Share with friends"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>{copied ? 'Link Copied!' : 'Share with friends'}</span>
          </button>

          <button
            onClick={onGuideClick}
            className="p-2 rounded-full text-[#c4c7c5] hover:text-white hover:bg-[#282a2c] transition-colors"
            title="Installation Guide"
            aria-label="Installation Guide"
          >
            <ShieldCheck className="w-5 h-5 text-[#8ab4f8]" />
          </button>

          <button
            onClick={onDownloadClick}
            className="hidden md:flex items-center space-x-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-md active:scale-95"
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
                    <DownloadCloud className="w-4 h-4 text-[#8ab4f8]" />
                    <span>Download APK v1.0.0</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onGuideClick();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#353739] text-[#e3e3e3] flex items-center space-x-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#8ab4f8]" />
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
                    <span>Share with friends</span>
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
