import React, { useState, useEffect, useRef } from 'react';
import { APP_DATA } from '../data/appData';
import { Wifi, Battery, Coins, Repeat, Clock, CheckCircle } from 'lucide-react';

export const ScreenshotCarousel: React.FC = () => {
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = performance.now();
    const speed = 40; // pixels per second

    const scrollLoop = (time: number) => {
      if (!isPaused && scrollContainer) {
        const deltaTime = time - lastTime;
        const scrollAmount = (speed * deltaTime) / 1000;
        
        scrollContainer.scrollLeft += scrollAmount;

        // Reset scroll position to create seamless loop when half is scrolled
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
        }
      }
      lastTime = time;
      animationId = requestAnimationFrame(scrollLoop);
    };

    animationId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Duplicate slides for seamless infinite scrolling
  const infiniteSlides = [...APP_DATA.featureSlides, ...APP_DATA.featureSlides];

  return (
    <div className="my-6 border-b border-[#282a2c] pb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-base sm:text-lg font-bold text-[#f1f3f4]">
          App Experience & Features
        </h2>
        <span className="text-xs text-[#9aa0a6]">Swipe to explore</span>
      </div>

      {/* Horizontal Scrollable Screenshots Track */}
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex space-x-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-1"
      >
        {infiniteSlides.map((slide, idx) => (
          <div
            key={`${slide.id}-${idx}`}
            onClick={() => setSelectedSlide(idx % APP_DATA.featureSlides.length)}
            className="shrink-0 w-[240px] sm:w-[270px] bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2d3033] shadow-md hover:border-[#8ab4f8]/50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {/* Top Caption Header (Google Play style card banner) */}
            <div className="bg-gradient-to-b from-[#242424] to-[#1a1a1a] p-4 text-center border-b border-[#2d3033]">
              <span className="inline-block px-2.5 py-0.5 mb-1.5 text-[10px] font-semibold tracking-wide uppercase bg-blue-500/10 text-[#8ab4f8] border border-blue-500/20 rounded-full">
                {slide.badge}
              </span>
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {slide.title}
              </h3>
            </div>

            {/* Mobile Screen Mockup Rendering */}
            <div className="p-3 bg-[#0d0d0d] flex justify-center">
              <div className="w-[200px] h-[360px] bg-[#121212] rounded-[24px] border-[3px] border-[#333] shadow-2xl relative overflow-hidden flex flex-col">
                {slide.imagePath ? (
                  <img src={slide.imagePath} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <>
                    {/* Status Bar */}
                    <div className="h-6 bg-[#000] px-3 flex items-center justify-between text-[9px] text-[#999]">
                      <span className="font-semibold text-white">9:41</span>
                      <div className="flex items-center space-x-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-2.5 h-2.5" />
                      </div>
                    </div>

                {/* 1. DATA SCREEN */}
                {slide.screenType === 'data' && (
                  <div className="p-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#141d2b] to-[#121212]">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-white">Buy Cheap Data</span>
                        <div className="flex space-x-1">
                          <span className="text-[8px] px-1 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">MTN</span>
                          <span className="text-[8px] px-1 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">Airtel</span>
                          <span className="text-[8px] px-1 py-0.5 rounded bg-blue-500/20 text-[#8ab4f8] font-bold">Glo</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#191919] p-1 rounded-md mb-2 text-[8px] text-[#aaa]">
                        <span className="px-1.5 py-0.5 rounded bg-[#2a2a2a] text-white font-semibold">Daily</span>
                        <span>Weekly</span>
                        <span>Nightplan</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="p-2 bg-[#162032] rounded-lg border border-blue-500/40 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white">1.0 GB SME Data</div>
                            <div className="text-[8px] text-[#888]">30 Days Validity</div>
                          </div>
                          <span className="text-[10px] font-bold text-[#8ab4f8]">₦260</span>
                        </div>
                        <div className="p-2 bg-[#1b1b1b] rounded-lg border border-[#333] flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white">2.0 GB SME Data</div>
                            <div className="text-[8px] text-[#888]">30 Days Validity</div>
                          </div>
                          <span className="text-[10px] font-bold text-[#8ab4f8]">₦520</span>
                        </div>
                        <div className="p-2 bg-[#1b1b1b] rounded-lg border border-[#333] flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white">5.0 GB Direct Gift</div>
                            <div className="text-[8px] text-[#888]">Instant Delivery</div>
                          </div>
                          <span className="text-[10px] font-bold text-[#8ab4f8]">₦1,300</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-[#2563eb] text-center text-[10px] font-bold text-white rounded-lg shadow">
                      Instant Delivery ⚡
                    </div>
                  </div>
                )}

                {/* 2. REWARDS / CASHBACK SCREEN */}
                {slide.screenType === 'rewards' && (
                  <div className="p-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#221c15] to-[#121212]">
                    <div>
                      <div className="flex items-center space-x-1 mb-2">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] font-bold text-white">Cashback & Rewards</span>
                      </div>

                      <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-orange-600/10 border border-amber-500/30 rounded-xl text-center mb-2">
                        <div className="text-[8px] text-amber-200">Total Cashback Earned</div>
                        <div className="text-sm font-bold text-amber-300 font-mono">₦2,450.00</div>
                        <div className="text-[7px] text-amber-400 mt-0.5">Ready to redeem</div>
                      </div>

                      <div className="space-y-1.5 text-[8px] text-[#ccc]">
                        <div className="p-1.5 bg-[#1e1e1e] rounded border border-[#333] flex items-center justify-between">
                          <span>Airtel Airtime Cashback</span>
                          <span className="text-[#8ab4f8] font-bold">+₦75.00</span>
                        </div>
                        <div className="p-1.5 bg-[#1e1e1e] rounded border border-[#333] flex items-center justify-between">
                          <span>MTN 5GB Data Cashback</span>
                          <span className="text-[#8ab4f8] font-bold">+₦120.00</span>
                        </div>
                        <div className="p-1.5 bg-[#1e1e1e] rounded border border-[#333] flex items-center justify-between">
                          <span>Referral Bonus</span>
                          <span className="text-[#8ab4f8] font-bold">+₦500.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-amber-600 hover:bg-amber-500 text-center text-[10px] font-bold text-white rounded-lg shadow">
                      Redeem to Wallet Now 🎁
                    </div>
                  </div>
                )}

                {/* 3. SMART WALLET & VIRTUAL ACCOUNTS */}
                {slide.screenType === 'wallet' && (
                  <div className="p-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#171c26] to-[#121212]">
                    <div>
                      <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white shadow-lg mb-2">
                        <div className="text-[8px] text-blue-200">Available Balance</div>
                        <div className="text-base font-bold tracking-tight">₦48,500.00</div>
                        <div className="text-[8px] mt-1 text-blue-200">Topit Automated Wallet</div>
                      </div>
                      <div className="space-y-1.5 text-[9px]">
                        <div className="p-1.5 bg-[#1e1e1e] rounded-md border border-[#333] flex items-center justify-between">
                          <span className="text-[#888]">Moniepoint MFB</span>
                          <span className="font-mono text-white font-bold">8291048291</span>
                        </div>
                        <div className="p-1.5 bg-[#1e1e1e] rounded-md border border-[#333] flex items-center justify-between">
                          <span className="text-[#888]">Wema Bank</span>
                          <span className="font-mono text-white font-bold">9028472911</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-600 text-center text-[10px] font-bold text-white rounded-lg">
                      + Fund Wallet Instantly
                    </div>
                  </div>
                )}

                {/* 4. AUTOMATIONS & SCHEDULED RECHARGES */}
                {slide.screenType === 'automations' && (
                  <div className="p-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#1b1726] to-[#121212]">
                    <div>
                      <div className="flex items-center space-x-1 mb-2">
                        <Repeat className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[11px] font-bold text-white">Smart Automations</span>
                      </div>

                      <div className="p-2 bg-[#221c2f] border border-indigo-500/30 rounded-xl mb-2">
                        <div className="flex items-center justify-between text-[8px] text-indigo-200 mb-1">
                          <span className="font-bold">Auto-Renew Wi-Fi Data</span>
                          <span className="text-[#8ab4f8] font-bold bg-blue-500/20 px-1 py-0.5 rounded">ACTIVE</span>
                        </div>
                        <div className="text-[10px] font-bold text-white">MTN 10GB Data Plan</div>
                        <div className="text-[8px] text-[#aaa]">Repeats: Every 7 Days</div>
                      </div>

                      <div className="space-y-1 text-[8px] text-[#888]">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span>Intervals: 24h, 48h, 1 Week, 1 Month</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-[#8ab4f8]" />
                          <span>Zero missed recharges guaranteed</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-indigo-600 text-center text-[10px] font-bold text-white rounded-lg">
                      + Create New Automation
                    </div>
                  </div>
                )}

                {/* 5. BRANDED RECEIPTS SCREEN */}
                {slide.screenType === 'receipt' && (
                  <div className="p-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#141d2b] to-[#121212]">
                    <div>
                      <div className="p-2.5 bg-white text-black rounded-lg shadow-md mb-2">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-1">
                          <span className="text-[9px] font-bold text-black">Topit Official Receipt</span>
                          <span className="text-[7px] text-blue-700 font-bold bg-blue-100 px-1 py-0.5 rounded">SUCCESS</span>
                        </div>
                        <div className="text-[8px] text-gray-600">MTN 5.0 GB SME Data (0803***)</div>
                        <div className="text-[11px] font-bold text-gray-900">₦1,300.00</div>
                        <div className="text-[7px] text-gray-400 font-mono mt-1">Ref: TOP-89214710</div>
                      </div>
                      <div className="text-[8px] text-[#888] text-center">
                        One-click share directly with clients on WhatsApp
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="p-1.5 flex-1 bg-[#2563eb] text-center text-[9px] font-bold text-white rounded-lg">
                        Download PDF
                      </div>
                      <div className="p-1.5 flex-1 bg-[#2a2a2a] text-center text-[9px] font-bold text-white rounded-lg">
                        Share Image
                      </div>
                    </div>
                  </div>
                )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Preview Modal */}
      {selectedSlide !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSlide(null)}
        >
          <div
            className="bg-[#1e1e1e] border border-[#333] rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {APP_DATA.featureSlides[selectedSlide].imagePath && (
              <div className="mb-5 w-full flex justify-center">
                <img 
                  src={APP_DATA.featureSlides[selectedSlide].imagePath} 
                  alt={APP_DATA.featureSlides[selectedSlide].title} 
                  className="max-h-[55vh] w-auto rounded-xl object-contain border border-[#333] shadow-lg"
                />
              </div>
            )}
            <div className="inline-block px-3 py-1 bg-blue-500/10 text-[#8ab4f8] text-xs font-semibold rounded-full border border-blue-500/20 mb-3">
              {APP_DATA.featureSlides[selectedSlide].badge}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {APP_DATA.featureSlides[selectedSlide].title}
            </h3>
            <p className="text-sm text-[#9aa0a6] mb-6">
              {APP_DATA.featureSlides[selectedSlide].subtitle}
            </p>
            <button
              onClick={() => setSelectedSlide(null)}
              className="w-full py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-full text-sm transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
