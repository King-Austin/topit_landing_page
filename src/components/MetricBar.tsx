import React from 'react';
import { Star, Download, Info } from 'lucide-react';
import { APP_DATA } from '../data/appData';

interface MetricBarProps {
  fileSizeMb: number;
  onRatingClick?: () => void;
}

export const MetricBar: React.FC<MetricBarProps> = ({ fileSizeMb, onRatingClick }) => {
  return (
    <div className="flex items-center justify-between py-4 border-y border-[#282a2c] my-4 overflow-x-auto no-scrollbar">
      {/* 1. Rating Metric */}
      <button
        onClick={onRatingClick}
        className="flex flex-col items-center justify-center px-3 sm:px-5 flex-1 min-w-[90px] border-r border-[#2d3033] hover:opacity-80 transition-opacity text-center cursor-pointer"
      >
        <div className="flex items-center space-x-1">
          <span className="text-sm sm:text-base font-bold text-[#f1f3f4]">{APP_DATA.rating}</span>
          <Star className="w-3.5 h-3.5 fill-[#f1f3f4] text-[#f1f3f4]" />
        </div>
        <div className="flex items-center text-[11px] sm:text-xs text-[#9aa0a6] mt-1">
          <span>{APP_DATA.reviewCountDisplay}</span>
          <Info className="w-2.5 h-2.5 ml-0.5 text-[#5f6368]" />
        </div>
      </button>

      {/* 2. Content Rating Metric */}
      <div className="flex flex-col items-center justify-center px-3 sm:px-5 flex-1 min-w-[90px] border-r border-[#2d3033] text-center">
        <div className="w-5 h-5 flex items-center justify-center border border-[#80868b] rounded text-[11px] font-bold text-[#f1f3f4]">
          3+
        </div>
        <div className="flex items-center text-[11px] sm:text-xs text-[#9aa0a6] mt-1">
          <span>{APP_DATA.contentRating}</span>
          <Info className="w-2.5 h-2.5 ml-0.5 text-[#5f6368]" />
        </div>
      </div>

      {/* 3. Downloads Metric */}
      <div className="flex flex-col items-center justify-center px-3 sm:px-5 flex-1 min-w-[90px] border-r border-[#2d3033] text-center">
        <div className="flex items-center space-x-1">
          <span className="text-sm sm:text-base font-bold text-[#f1f3f4]">{APP_DATA.downloadsDisplay}</span>
        </div>
        <div className="text-[11px] sm:text-xs text-[#9aa0a6] mt-1">
          <span>Downloads</span>
        </div>
      </div>

      {/* 4. File Size Metric (Dynamic) */}
      <div className="flex flex-col items-center justify-center px-3 sm:px-5 flex-1 min-w-[90px] text-center">
        <div className="flex items-center space-x-1 text-[#f1f3f4]">
          <Download className="w-3.5 h-3.5 text-[#8ab4f8]" />
          <span className="text-sm sm:text-base font-bold">{fileSizeMb.toFixed(1)} MB</span>
        </div>
        <div className="text-[11px] sm:text-xs text-[#9aa0a6] mt-1">
          <span>APK Size</span>
        </div>
      </div>
    </div>
  );
};
