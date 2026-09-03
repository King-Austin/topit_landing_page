import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { APP_DATA } from '../data/appData';

export const ScreenshotCarousel: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = APP_DATA.featureSlides.length;

  const nextSlide = () => {
    if (selectedSlide !== null) {
      setSelectedSlide((prev) => (prev! + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (selectedSlide !== null) {
      setSelectedSlide((prev) => (prev! - 1 + totalSlides) % totalSlides);
    }
  };

  // Keyboard navigation (Arrow keys + Escape)
  useEffect(() => {
    if (selectedSlide === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setSelectedSlide(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="my-6 border-b border-[#e8eaed] pb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-base sm:text-lg font-bold text-[#202124]">
          App Experience & Features
        </h2>
        <span className="text-xs text-[#5f6368]">Tap to enlarge & slide</span>
      </div>

      {/* 3 Full-Frame Photos Grid - Side-by-side in all screen modes */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 px-1">
        {APP_DATA.featureSlides.map((slide, idx) => (
          <div
            key={slide.id}
            onClick={() => setSelectedSlide(idx)}
            className="w-full bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-[#e8eaed] shadow-xs hover:border-[#0b57d0] hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group relative"
          >
            {slide.imagePath && (
              <img
                src={slide.imagePath}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 block"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Sliding Viewer Modal */}
      {selectedSlide !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={() => setSelectedSlide(null)}
        >
          {/* Main Card Container */}
          <div
            className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Slide counter & Close Button */}
            <div className="w-full flex items-center justify-between mb-3 text-white px-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                {selectedSlide + 1} / {totalSlides}
              </span>
              <button
                onClick={() => setSelectedSlide(null)}
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Slide Display with Navigation Arrows */}
            <div className="relative w-full flex items-center justify-center">
              {/* Previous Slide Button */}
              <button
                onClick={prevSlide}
                className="absolute -left-3 sm:-left-6 z-10 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 shadow-lg transition-transform active:scale-95 cursor-pointer"
                title="Previous photo"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Photo Image Card */}
              {APP_DATA.featureSlides[selectedSlide].imagePath && (
                <div className="w-full flex justify-center overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    key={selectedSlide}
                    src={APP_DATA.featureSlides[selectedSlide].imagePath} 
                    alt={APP_DATA.featureSlides[selectedSlide].title} 
                    className="max-h-[72vh] sm:max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl animate-in zoom-in-95 fade-in duration-200"
                  />
                </div>
              )}

              {/* Next Slide Button */}
              <button
                onClick={nextSlide}
                className="absolute -right-3 sm:-right-6 z-10 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 shadow-lg transition-transform active:scale-95 cursor-pointer"
                title="Next photo"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Navigation Dots & Swipe Hint */}
            <div className="mt-4 flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                {APP_DATA.featureSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      selectedSlide === idx
                        ? 'w-6 bg-[#0b57d0]'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-white/70">
                Swipe left / right or tap arrows to slide
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
