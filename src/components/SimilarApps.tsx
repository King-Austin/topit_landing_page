import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export const SimilarApps: React.FC = () => {
  const similar = [
    {
      name: 'Topit Reseller Pro',
      category: 'Business & VTU Reselling',
      rating: '4.9',
      size: '18 MB',
      iconBg: 'bg-emerald-600',
      symbol: 'TP'
    },
    {
      name: 'QuickData SME',
      category: 'Data Bundles & Airtime',
      rating: '4.7',
      size: '20 MB',
      iconBg: 'bg-amber-600',
      symbol: 'QD'
    },
    {
      name: 'SmartRecharge Plus',
      category: 'Automated VTU',
      rating: '4.8',
      size: '16 MB',
      iconBg: 'bg-blue-600',
      symbol: 'SR'
    }
  ];

  return (
    <div className="my-6 border-b border-[#282a2c] pb-6">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-lg font-bold text-[#f1f3f4] flex items-center">
          Similar apps available
        </h2>
        <div className="p-1 rounded-full text-[#9aa0a6] hover:text-white transition-colors cursor-pointer">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {similar.map((app) => (
          <div
            key={app.name}
            className="p-3 bg-[#1e1e1e] rounded-xl border border-[#2d3033] flex items-center space-x-3 hover:border-[#3c4043] transition-colors cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl ${app.iconBg} text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0`}>
              {app.symbol}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-white text-xs truncate">{app.name}</div>
              <div className="text-[#9aa0a6] text-[11px] truncate">{app.category}</div>
              <div className="flex items-center space-x-2 text-[10px] text-[#c4c7c5] mt-1">
                <span className="flex items-center">
                  {app.rating} <Star className="w-2.5 h-2.5 fill-[#01875f] text-[#01875f] ml-0.5" />
                </span>
                <span>•</span>
                <span>{app.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
