import React from 'react';

interface FooterProps {
  onOpenDoc?: (tab: 'terms' | 'privacy' | 'refund' | 'security') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDoc }) => {
  return (
    <footer className="mt-12 pt-8 pb-12 border-t border-[#282a2c] text-xs text-[#9aa0a6]">
      {/* Primary Section Links */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <a href="#about" className="hover:text-[#e3e3e3] transition-colors">About Topit</a>
        <a href="#features" className="hover:text-[#e3e3e3] transition-colors">Features</a>
        <a href="#ratings-section" className="hover:text-[#e3e3e3] transition-colors">Ratings & Reviews</a>
        <a href="mailto:support@websyncdigital.com" className="hover:text-[#e3e3e3] transition-colors">Contact Support</a>
      </div>

      {/* Legal & Policy Documentation Links */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-[11px] text-[#80868b]">
        <button
          onClick={() => onOpenDoc?.('terms')}
          className="hover:text-[#bdc1c6] transition-colors text-left"
        >
          Terms of Service
        </button>
        <button
          onClick={() => onOpenDoc?.('privacy')}
          className="hover:text-[#bdc1c6] transition-colors text-left"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => onOpenDoc?.('refund')}
          className="hover:text-[#bdc1c6] transition-colors text-left"
        >
          Refund & Reversal Policy
        </button>
        <button
          onClick={() => onOpenDoc?.('security')}
          className="hover:text-[#bdc1c6] transition-colors text-left"
        >
          Data Safety & Security
        </button>
      </div>

      {/* Copyright & Publisher */}
      <div className="text-[11px] text-[#5f6368] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>© {new Date().getFullYear()} Topit by Websync Digital. All rights reserved.</span>
        <span>Licensed Utility & Value Added Telecommunication Services</span>
      </div>
    </footer>
  );
};
