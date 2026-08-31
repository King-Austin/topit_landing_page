import { useEffect, useState } from 'react';
import { GooglePlayHeader } from './components/GooglePlayHeader';
import { AppSummaryHeader } from './components/AppSummaryHeader';
import { MetricBar } from './components/MetricBar';
import { InstallButton } from './components/InstallButton';
import { ScreenshotCarousel } from './components/ScreenshotCarousel';
import { AboutSection } from './components/AboutSection';
import { DataSafetyCard } from './components/DataSafetyCard';
import { RatingsAndReviews } from './components/RatingsAndReviews';
import { DeveloperContact } from './components/DeveloperContact';
import { SimilarApps } from './components/SimilarApps';
import { Footer } from './components/Footer';
import { ApkInstallGuideModal } from './components/ApkInstallGuideModal';
import { type AppReleaseInfo, FALLBACK_RELEASE, fetchLatestRelease } from './lib/supabase';

import { APP_DATA } from './data/appData';
import { DownloadCloud } from 'lucide-react';

export function App() {
  const [releaseInfo, setReleaseInfo] = useState<AppReleaseInfo>(FALLBACK_RELEASE);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#121212] text-[#e3e3e3] flex flex-col font-['Google_Sans',sans-serif]">
      {/* Google Play App Top Bar */}
      <GooglePlayHeader
        onDownloadClick={triggerDirectDownload}
        onGuideClick={() => setIsGuideOpen(true)}
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
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Horizontal Screenshots Carousel */}
        <ScreenshotCarousel />

        {/* About App & Features & What's New */}
        <AboutSection releaseInfo={releaseInfo} />

        {/* Data Safety Card */}
        <DataSafetyCard />

        {/* Ratings and Reviews Section */}
        <RatingsAndReviews />

        {/* Developer Contact Drawer */}
        <DeveloperContact />

        {/* Similar Utility Apps */}
        <SimilarApps />

        {/* Footer */}
        <Footer />
      </main>

      {/* Persistent Floating Bottom Install CTA on mobile when scrolled */}
      {showFloatingBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#1e1e1e]/95 backdrop-blur-md border-t border-[#333] shadow-2xl flex items-center justify-between sm:hidden animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center space-x-2.5 min-w-0 mr-2">
            <img
              src="/icon.png"
              alt="Topit"
              className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{APP_DATA.name}</div>
              <div className="text-[10px] text-[#9aa0a6] truncate">v{releaseInfo.version} • {releaseInfo.fileSizeMb.toFixed(1)} MB</div>
            </div>
          </div>
          <button
            onClick={triggerDirectDownload}
            className="px-5 py-2 rounded-full bg-[#01875f] hover:bg-[#00a86b] text-white text-xs font-semibold flex items-center space-x-1.5 shrink-0 shadow-md active:scale-95"
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
        onDownload={triggerDirectDownload}
        version={releaseInfo.version}
      />
    </div>
  );
}

export default App;
