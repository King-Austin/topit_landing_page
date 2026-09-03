import React, { useState, useCallback } from 'react';
import { DownloadCloud, ShieldCheck, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InstallButtonProps {
  downloadUrl: string;
  version: string;
  fileSizeMb: number;
  onOpenGuide: (onDownloadCallback: () => void) => void;
}

export const InstallButton: React.FC<InstallButtonProps> = ({
  downloadUrl,
  version,
  fileSizeMb,
  onOpenGuide
}) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  const startDownload = useCallback(() => {
    if (downloading) return;
    setDownloading(true);
    setProgress(5);

    // Simulate authentic loading bar progress before triggering native file download
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 10) + 6;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setDownloading(false);
      setDownloaded(true);

      // Trigger file download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `topit-v${version}.apk`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#8ab4f8', '#60a5fa', '#3b82f6', '#93c5fd']
        });
      } catch {
        // Confetti fallback
      }
    }, 2000);
  }, [downloading, downloadUrl, version]);

  const handleInstallClick = () => {
    if (downloading || downloaded) return;
    // Open the guide first, passing in the download callback
    onOpenGuide(startDownload);
  };

  return (
    <div className="my-3 space-y-3">
      {/* Primary Action Button */}
      <button
        onClick={handleInstallClick}
        disabled={downloading}
        className={`w-full py-3 sm:py-3.5 px-6 rounded-full font-medium text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-md select-none relative overflow-hidden active:scale-[0.98] cursor-pointer ${
          downloaded
            ? 'bg-[#e8f0fe] text-[#0b57d0] border border-[#aecbfa]'
            : 'bg-[#0b57d0] hover:bg-[#0842a0] text-white font-semibold'
        }`}
      >
        {/* Progress Fill Bar */}
        {downloading && (
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#0842a0] transition-all duration-300 ease-out opacity-40"
            style={{ width: `${progress}%` }}
          />
        )}

        <div className="relative z-10 flex items-center space-x-2">
          {downloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Downloading Topit APK ({progress}%)...</span>
            </>
          ) : downloaded ? (
            <>
              <DownloadCloud className="w-5 h-5 text-[#0b57d0] animate-bounce" />
              <span>Downloading... Check your Downloads</span>
            </>
          ) : (
            <>
              <DownloadCloud className="w-5 h-5" />
              <span>Install (Download APK • {fileSizeMb.toFixed(1)} MB)</span>
            </>
          )}
        </div>
      </button>

      {/* Sub-row helper links */}
      <div className="flex items-center justify-between px-1 text-xs text-[#5f6368]">
        <button
          onClick={() => onOpenGuide(startDownload)}
          className="flex items-center space-x-1 text-[#0b57d0] hover:text-[#0842a0] hover:underline transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#0b57d0]" />
          <span>How to install APK on Android</span>
        </button>

        <div className="flex items-center space-x-1 text-[#5f6368]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android 8.0+</span>
        </div>
      </div>

      {/* Similar app / notice box matching screenshot */}
      <div className="mt-4 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed] flex items-center justify-between text-xs">
        <div className="flex items-start space-x-2.5">
          <div className="p-1.5 rounded-full bg-[#e8f0fe] text-[#0b57d0] shrink-0 mt-0.5">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[#202124] font-medium">Instant Android Deployment</div>
            <div className="text-[#5f6368] text-[11px] mt-0.5">
              Direct official build (v{version}) verified by Websync Digital
            </div>
          </div>
        </div>
        <button
          onClick={handleInstallClick}
          className="text-[#0b57d0] font-medium hover:underline text-xs shrink-0 ml-2 cursor-pointer"
        >
          Get APK
        </button>
      </div>
    </div>
  );
};
