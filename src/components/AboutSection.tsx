import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { APP_DATA } from '../data/appData';
import type { AppReleaseInfo } from '../lib/supabase';

interface AboutSectionProps {
  releaseInfo: AppReleaseInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ releaseInfo }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [displayedLength, setDisplayedLength] = useState(0);
  const fullText = APP_DATA.about;
  const targetLengthRef = useRef(0);
  const currentLengthRef = useRef(0);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isCompletedRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start typing when section enters the bottom 30% of viewport
      const startOffset = windowHeight * 0.85;
      const endOffset = windowHeight * 0.20;

      const totalDistance = startOffset - endOffset;
      const currentProgress = Math.min(
        Math.max((startOffset - rect.top) / totalDistance, 0),
        1
      );

      // Target character count based on scroll progression
      const newTarget = Math.floor(currentProgress * fullText.length);
      if (newTarget > targetLengthRef.current) {
        targetLengthRef.current = newTarget;
      }

      if (currentProgress >= 0.98) {
        targetLengthRef.current = fullText.length;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrame: number;
    const typeLoop = () => {
      if (currentLengthRef.current < targetLengthRef.current) {
        const step = Math.min(3, targetLengthRef.current - currentLengthRef.current);
        currentLengthRef.current += step;
        setDisplayedLength(currentLengthRef.current);

        if (currentLengthRef.current >= fullText.length) {
          isCompletedRef.current = true;
        }
      }

      animationFrame = requestAnimationFrame(typeLoop);
    };

    animationFrame = requestAnimationFrame(typeLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [fullText]);

  // Click to reveal all instantly
  const handleSkipTyping = () => {
    targetLengthRef.current = fullText.length;
    currentLengthRef.current = fullText.length;
    setDisplayedLength(fullText.length);
    isCompletedRef.current = true;
  };

  const isStillTyping = displayedLength > 0 && displayedLength < fullText.length;
  const currentText = fullText.slice(0, Math.max(displayedLength, displayedLength === 0 ? 100 : displayedLength));

  // Parse lines for ChatGPT-style markdown rendering
  const lines = currentText.split('\n');

  return (
    <div ref={sectionRef} className="my-6 border-b border-[#282a2c] pb-6">
      {/* Section Header */}
      <div className="w-full flex items-center justify-between py-2 text-left">
        <h2 className="text-lg font-bold text-[#f1f3f4] flex items-center space-x-2">
          <span>About this app</span>
          {isStillTyping && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#8ab4f8]/15 border border-[#8ab4f8]/30 text-[#8ab4f8] animate-pulse">
              Scroll to reveal
            </span>
          )}
        </h2>
      </div>

      {/* ChatGPT-Style Structured Markdown Container */}
      <div
        onClick={handleSkipTyping}
        className="mt-3 text-[14.5px] leading-[1.75] text-[#d1d5db] bg-[#1a1a1a]/90 border border-[#333] p-5 sm:p-6 rounded-2xl relative cursor-default select-text transition-all hover:border-[#444] shadow-lg"
        title={isStillTyping ? 'Click to reveal all' : undefined}
      >
        <div className="space-y-3.5 font-normal tracking-[-0.01em]">
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            // Header line: "What makes Topit revolutionary:"
            if (trimmed.toLowerCase().startsWith('what makes topit revolutionary')) {
              return (
                <div key={idx} className="pt-2 pb-1">
                  <h3 className="text-[15px] font-bold text-white tracking-tight flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8]" />
                    <span>{trimmed}</span>
                  </h3>
                </div>
              );
            }

            // Bold lead-in transition: "Today, we are changing that forever."
            if (trimmed.toLowerCase().includes('today, we are changing that forever')) {
              return (
                <p key={idx} className="font-semibold text-white text-[15px]">
                  {trimmed}
                </p>
              );
            }

            // Bullet line: starts with "•" or "-"
            if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
              const cleanLine = trimmed.replace(/^[•\-]\s*/, '');
              const colonIndex = cleanLine.indexOf(':');

              if (colonIndex !== -1) {
                const title = cleanLine.substring(0, colonIndex + 1);
                const description = cleanLine.substring(colonIndex + 1);

                return (
                  <div key={idx} className="flex items-start space-x-2.5 py-1 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8] mt-2 shrink-0" />
                    <div className="text-[14px]">
                      <span className="font-semibold text-white">{title}</span>
                      <span className="text-[#9ca3af]">{description}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={idx} className="flex items-start space-x-2.5 py-1 pl-1 text-[14px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8ab4f8] mt-2 shrink-0" />
                  <span className="text-[#9ca3af]">{cleanLine}</span>
                </div>
              );
            }

            // Final closing sentence: "It is not just better data..."
            if (trimmed.toLowerCase().includes('it is not just better data')) {
              return (
                <div key={idx} className="mt-4 pt-3.5 border-t border-white/10 border-l-2 border-l-[#8ab4f8] pl-3.5 italic text-[#e5e7eb] font-medium text-[14px]">
                  {trimmed}
                </div>
              );
            }

            // Standard paragraphs
            return (
              <p key={idx} className="text-[#c4c7c5]">
                {trimmed}
              </p>
            );
          })}

          {/* Active Typewriter Cursor in Topit Blue */}
          {isStillTyping && (
            <span className="inline-block w-2 h-4 ml-1 bg-[#8ab4f8] rounded-xs shadow-[0_0_8px_#8ab4f8] animate-pulse align-middle" />
          )}
        </div>
      </div>

      {/* Category Chips / Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {APP_DATA.tags.map((tag) => (
          <span
            key={tag}
            className="px-3.5 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-[#e3e3e3] hover:text-white border border-[#333] hover:border-[#8ab4f8]/40 rounded-full text-xs font-medium transition-all select-none shadow-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* What's New Box */}
      <div className="mt-6 p-4 rounded-xl bg-[#141b26] border border-[#8ab4f8]/25">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#8ab4f8]" />
          <h3 className="text-sm font-bold text-white">What's New in v{releaseInfo.version}</h3>
        </div>
        <div className="text-xs text-[#9aa0a6] mb-3">
          Release date: {releaseInfo.releaseDate}
        </div>
        <ul className="space-y-1.5 text-xs text-[#c4c7c5]">
          {releaseInfo.changelog.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-[#8ab4f8] font-bold">•</span>
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
