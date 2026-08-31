import React from 'react';
import { APP_DATA } from '../data/appData';
import { BadgeCheck } from 'lucide-react';

export const AppSummaryHeader: React.FC = () => {
  return (
    <div className="flex items-start gap-4 sm:gap-6 pt-2 pb-2">
      {/* App Icon with Google Play squircle curve & lighting */}
      <div className="relative shrink-0">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[22px] sm:rounded-[26px] bg-[#1e1e1e] p-0.5 shadow-xl border border-white/10 overflow-hidden group">
          <img
            src="/icon.png"
            alt="Topit App Icon"
            className="w-full h-full object-cover rounded-[20px] sm:rounded-[24px] transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* App Name, Developer, Category & Monetization badges */}
      <div className="flex flex-col justify-center min-w-0 py-0.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f1f3f4] leading-tight flex items-center gap-2">
          <span>{APP_DATA.name}</span>
        </h1>
        
        <div className="mt-1 flex items-center space-x-1.5">
          <a
            href={APP_DATA.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base font-medium text-[#8ab4f8] hover:text-[#a8c7fa] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>{APP_DATA.developer}</span>
            <BadgeCheck className="w-4 h-4 text-[#8ab4f8]" />
          </a>
        </div>

        <div className="mt-1 text-xs sm:text-sm text-[#9aa0a6] flex items-center flex-wrap gap-x-2 gap-y-0.5 font-normal">
          <span>{APP_DATA.inAppDetails}</span>
        </div>
      </div>
    </div>
  );
};
