import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { APP_DATA } from '../data/appData';
import type { AppReleaseInfo } from '../lib/supabase';


interface AboutSectionProps {
  releaseInfo: AppReleaseInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ releaseInfo }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-6 border-b border-[#282a2c] pb-6">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between group py-2 text-left"
      >
        <h2 className="text-lg font-bold text-[#f1f3f4] group-hover:text-white flex items-center">
          About this app
        </h2>
        <div className="p-1 rounded-full text-[#9aa0a6] group-hover:text-white group-hover:translate-x-0.5 transition-all">
          <ArrowRight className="w-5 h-5" />
        </div>
      </button>

      {/* Description Snippet / Expanded Content */}
      <div className="mt-2 text-sm leading-relaxed text-[#bdc1c6]">
        {expanded ? (
          <div className="space-y-3 whitespace-pre-line animate-in fade-in duration-200">
            <p>{APP_DATA.about}</p>
          </div>
        ) : (
          <p className="line-clamp-3">
            Topit is your all-in-one smart utility and automated VTU platform designed for fast, seamless, and discounted payments. Whether you need instant SME data bundles, airtime recharge with cashback, electricity tokens, or cable TV subscriptions...
          </p>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-semibold text-[#8ab4f8] hover:text-[#a8c7fa] hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </div>

      {/* Category Chips / Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {APP_DATA.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#282a2c] text-[#e3e3e3] border border-[#3c4043] rounded-full text-xs font-medium transition-colors select-none"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* What's New Box */}
      <div className="mt-6 p-4 rounded-xl bg-[#1b221f] border border-[#01875f]/30">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">What's New in v{releaseInfo.version}</h3>
        </div>
        <div className="text-xs text-[#9aa0a6] mb-3">
          Release date: {releaseInfo.releaseDate}
        </div>
        <ul className="space-y-1.5 text-xs text-[#c4c7c5]">
          {releaseInfo.changelog.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* App Info Grid (Google Play spec sheet) */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#282a2c] text-xs">
        <div>
          <div className="text-[#9aa0a6]">Version</div>
          <div className="text-[#f1f3f4] font-medium mt-0.5">{releaseInfo.version}</div>
        </div>
        <div>
          <div className="text-[#9aa0a6]">Updated on</div>
          <div className="text-[#f1f3f4] font-medium mt-0.5">{releaseInfo.releaseDate}</div>
        </div>
        <div>
          <div className="text-[#9aa0a6]">Requires Android</div>
          <div className="text-[#f1f3f4] font-medium mt-0.5">8.0 and up</div>
        </div>
        <div>
          <div className="text-[#9aa0a6]">Downloads</div>
          <div className="text-[#f1f3f4] font-medium mt-0.5">{APP_DATA.downloadsDisplay}</div>
        </div>
        <div>
          <div className="text-[#9aa0a6]">Interactive Elements</div>
          <div className="text-[#f1f3f4] font-medium mt-0.5">In-App Purchases</div>
        </div>
        <div>
          <div className="text-[#9aa0a6]">Offered by</div>
          <div className="text-[#f1f3f4] font-medium mt-0.5">{APP_DATA.developer}</div>
        </div>
      </div>
    </div>
  );
};
