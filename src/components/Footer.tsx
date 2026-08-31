import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-12 border-t border-[#282a2c] text-xs text-[#9aa0a6]">
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
        <a href="#play" className="hover:text-[#e3e3e3] transition-colors">Google Play</a>
        <a href="#play-pass" className="hover:text-[#e3e3e3] transition-colors">Play Pass</a>
        <a href="#play-points" className="hover:text-[#e3e3e3] transition-colors">Play Points</a>
        <a href="#gift-cards" className="hover:text-[#e3e3e3] transition-colors">Gift cards</a>
        <a href="#redeem" className="hover:text-[#e3e3e3] transition-colors">Redeem</a>
        <a href="#refund-policy" className="hover:text-[#e3e3e3] transition-colors">Refund policy</a>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-[11px] text-[#80868b]">
        <a href="#terms" className="hover:text-[#bdc1c6]">Terms of Service</a>
        <a href="#privacy" className="hover:text-[#bdc1c6]">Privacy</a>
        <a href="#about-google-play" className="hover:text-[#bdc1c6]">About Google Play</a>
        <a href="#developers" className="hover:text-[#bdc1c6]">Developers</a>
        <a href="#google-store" className="hover:text-[#bdc1c6]">Google Store</a>
      </div>

      <div className="text-[11px] text-[#5f6368]">
        All prices include VAT. Topit is distributed by Websync Digital.
      </div>
    </footer>
  );
};
