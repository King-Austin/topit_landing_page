import React, { useState } from 'react';
import { MoreVertical, Share2, ShieldCheck, DownloadCloud } from 'lucide-react';


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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8eaed] transition-all">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Topit Logo & Brand Name */}
        <div className="flex items-center space-x-2.5">
          <img src="/splash-icon.webp" alt="Topit" className="w-11 h-11 sm:w-12 sm:h-12 object-contain block" />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#202124] inline-block">Topit</span>
        </div>

        {/* Right: Search, Share, Quick APK action, Kebab Menu */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#0b57d0] hover:bg-[#e8f0fe] active:bg-[#d2e3fc] transition-colors"
            title="Share with friends"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>{copied ? 'Link Copied!' : 'Share with friends'}</span>
          </button>

          <button
            onClick={onGuideClick}
            className="p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            title="Installation Guide"
            aria-label="Installation Guide"
          >
            <ShieldCheck className="w-5 h-5 text-[#0b57d0]" />
          </button>

          <button
            onClick={onDownloadClick}
            className="hidden md:flex items-center space-x-1.5 bg-[#0b57d0] hover:bg-[#0842a0] text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Install APK</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
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
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#dadce0] rounded-xl shadow-2xl py-1.5 z-40 text-sm animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDownloadClick();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f1f3f4] text-[#202124] flex items-center space-x-2.5"
                  >
                    <DownloadCloud className="w-4 h-4 text-[#0b57d0]" />
                    <span>Download APK v1.0.0</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onGuideClick();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f1f3f4] text-[#202124] flex items-center space-x-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0b57d0]" />
                    <span>Installation Instructions</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      handleShare();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f1f3f4] text-[#202124] flex items-center space-x-2.5"
                  >
                    <Share2 className="w-4 h-4 text-[#0b57d0]" />
                    <span>Share with friends</span>
                  </button>
                  <a
                    href="mailto:support@websyncdigital.com"
                    className="w-full text-left px-4 py-2.5 hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#202124] block"
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
