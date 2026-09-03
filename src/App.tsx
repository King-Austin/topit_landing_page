import { useEffect, useState, useRef } from 'react';
import { GooglePlayHeader } from './components/GooglePlayHeader';
import { AppSummaryHeader } from './components/AppSummaryHeader';
import { MetricBar } from './components/MetricBar';
import { InstallButton } from './components/InstallButton';
import { ScreenshotCarousel } from './components/ScreenshotCarousel';
import { AboutSection } from './components/AboutSection';
import { DataSafetyCard } from './components/DataSafetyCard';
import { RatingsAndReviews } from './components/RatingsAndReviews';
import { Footer } from './components/Footer';
import { ApkInstallGuideModal } from './components/ApkInstallGuideModal';
import { LegalDocsModal } from './components/LegalDocsModal';
import { type AppReleaseInfo, FALLBACK_RELEASE, fetchLatestRelease } from './lib/supabase';

import { APP_DATA } from './data/appData';
import { DownloadCloud } from 'lucide-react';

export default function App() {
  const [releaseInfo, setReleaseInfo] = useState<AppReleaseInfo>(FALLBACK_RELEASE);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isLegalDocOpen, setIsLegalDocOpen] = useState(false);
  const [legalDocTab, setLegalDocTab] = useState<'terms' | 'privacy' | 'refund' | 'security'>('terms');
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Stores the download callback so the guide modal can trigger it
  const downloadCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Load dynamic build release info from Supabase
    fetchLatestRelease().then((info) => {
      setReleaseInfo(info);
    });

    // Detect scroll for mobile floating install bar
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerDirectDownload = () => {
    const link = document.createElement('a');
    link.href = releaseInfo.downloadUrl;
    link.setAttribute('download', `topit-v${releaseInfo.version}.apk`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToRatings = () => {
    const el = document.getElementById('ratings-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLegalDoc = (tab: 'terms' | 'privacy' | 'refund' | 'security') => {
    setLegalDocTab(tab);
    setIsLegalDocOpen(true);
  };

  // Opens the guide modal and stores the download callback for later
  const handleOpenGuideWithCallback = (downloadCallback: () => void) => {
    downloadCallbackRef.current = downloadCallback;
    setIsGuideOpen(true);
  };

  // Called when user clicks "Download APK Now" inside the guide modal
  const handleGuideDownload = () => {
    setIsGuideOpen(false);
    // Small delay so the modal closes smoothly before the loading bar starts
    setTimeout(() => {
      if (downloadCallbackRef.current) {
        downloadCallbackRef.current();
        downloadCallbackRef.current = null;
      } else {
        triggerDirectDownload();
      }
    }, 300);
  };

  // Opens guide without a download callback (just for reading instructions)
  const handleOpenGuideOnly = () => {
    downloadCallbackRef.current = null;
    setIsGuideOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#202124] flex flex-col font-['Google_Sans',sans-serif]">
      {/* Topit App Top Bar */}
      <GooglePlayHeader
        onDownloadClick={() => handleOpenGuideOnly()}
        onGuideClick={() => handleOpenGuideOnly()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 pb-16">
        {/* App Hero Information */}
        <AppSummaryHeader />

        {/* 4-Item Metric Row */}
        <MetricBar
          fileSizeMb={releaseInfo.fileSizeMb}
          onRatingClick={scrollToRatings}
        />

        {/* Action Button & APK install trigger */}
        <InstallButton
          downloadUrl={releaseInfo.downloadUrl}
          version={releaseInfo.version}
          fileSizeMb={releaseInfo.fileSizeMb}
          onOpenGuide={handleOpenGuideWithCallback}
        />

        {/* Horizontal Screenshots Carousel */}
        <ScreenshotCarousel />

        {/* About App & Features & What's New */}
        <AboutSection releaseInfo={releaseInfo} />

        {/* Data Safety Card */}
        <DataSafetyCard />

        {/* Ratings and Reviews Section */}
        <RatingsAndReviews />

        {/* Footer */}
        <Footer onOpenDoc={handleOpenLegalDoc} />
      </main>

      {/* Persistent Floating Bottom Install CTA on mobile when scrolled */}
      {showFloatingBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#e8eaed] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between sm:hidden animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center space-x-2.5 min-w-0 mr-2">
            <img
              src="/icon.webp"
              alt="Topit"
              className="w-10 h-10 rounded-xl object-cover border border-[#e8eaed] shadow-xs shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#202124] truncate">{APP_DATA.name}</div>
              <div className="text-[10px] text-[#5f6368] truncate">v{releaseInfo.version} • {releaseInfo.fileSizeMb.toFixed(1)} MB</div>
            </div>
          </div>
          <button
            onClick={() => handleOpenGuideOnly()}
            className="px-5 py-2 rounded-full bg-[#0b57d0] hover:bg-[#0842a0] text-white text-xs font-semibold flex items-center space-x-1.5 shrink-0 shadow-md active:scale-95 cursor-pointer"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        </div>
      )}

      {/* Android Installation Walkthrough Modal */}
      <ApkInstallGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onDownload={handleGuideDownload}
        version={releaseInfo.version}
      />

      {/* Legal & Policy Documentation Modal */}
      <LegalDocsModal
        isOpen={isLegalDocOpen}
        onClose={() => setIsLegalDocOpen(false)}
        initialTab={legalDocTab}
      />
    </div>
  );
}
