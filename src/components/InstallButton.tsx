import React, { useState } from 'react';
import { DownloadCloud, CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InstallButtonProps {
  downloadUrl: string;
  version: string;
  fileSizeMb: number;
  onOpenGuide: () => void;
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

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setProgress(10);

    // Simulate authentic progress feel before triggering native file download
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 150);

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

      // Automatically offer the install guide after 1.2 seconds
      setTimeout(() => {
        onOpenGuide();
      }, 1200);
    }, 900);
  };

  return (
    <div className="my-3 space-y-3">
      {/* Primary Action Button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`w-full py-3 sm:py-3.5 px-6 rounded-full font-medium text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-lg select-none relative overflow-hidden active:scale-[0.98] ${
          downloaded
            ? 'bg-[#172554] text-[#93c5fd] border border-[#3b82f6]/40'
            : 'bg-[#a8c7fa] hover:bg-[#c2e7ff] text-[#041e49] font-semibold'
        }`}
      >
        {/* Progress Fill Bar */}
        {downloading && (
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#3b82f6] transition-all duration-200 opacity-40"
            style={{ width: `${progress}%` }}
          />
        )}

        <div className="relative z-10 flex items-center space-x-2">
          {downloading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#041e49] border-t-transparent rounded-full animate-spin" />
              <span>Downloading Topit APK ({progress}%)...</span>
            </>
          ) : downloaded ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-[#60a5fa]" />
              <span>Download Complete! Open File to Install</span>
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
      <div className="flex items-center justify-between px-1 text-xs text-[#9aa0a6]">
        <button
          onClick={onOpenGuide}
          className="flex items-center space-x-1 text-[#8ab4f8] hover:text-[#a8c7fa] hover:underline transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-[#8ab4f8]" />
          <span>How to install APK on Android</span>
        </button>

        <div className="flex items-center space-x-1 text-[#5f6368]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android 8.0+</span>
        </div>
      </div>

      {/* Similar app / notice box matching screenshot */}
      <div className="mt-4 p-3 bg-[#1e1e1e] rounded-xl border border-[#2d3033] flex items-center justify-between text-xs">
        <div className="flex items-start space-x-2.5">
          <div className="p-1.5 rounded-full bg-[#2d3033] text-[#8ab4f8] shrink-0 mt-0.5">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[#f1f3f4] font-medium">Instant Android Deployment</div>
            <div className="text-[#9aa0a6] text-[11px] mt-0.5">
              Direct official build (v{version}) verified by Websync Digital
            </div>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="text-[#8ab4f8] font-medium hover:underline text-xs shrink-0 ml-2"
        >
          Get APK
        </button>
      </div>
    </div>
  );
};
