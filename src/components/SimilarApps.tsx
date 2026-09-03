import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export const SimilarApps: React.FC = () => {
  const similar = [
    {
      name: 'Topit Reseller Pro',
      category: 'Business & VTU Reselling',
      rating: '4.9',
      size: '18 MB',
      iconBg: 'bg-blue-600',
      symbol: 'TP'
    },
    {
      name: 'QuickData SME',
      category: 'Data Bundles & Airtime',
      rating: '4.7',
      size: '20 MB',
      iconBg: 'bg-indigo-600',
      symbol: 'QD'
    },
    {
      name: 'SmartRecharge Plus',
      category: 'Automated VTU',
      rating: '4.8',
      size: '16 MB',
      iconBg: 'bg-sky-600',
      symbol: 'SR'
    }
  ];

  return (
    <div className="my-6 border-b border-[#e8eaed] pb-6">
      <div className="flex items-center justify-between py-2">
        <h2 className="text-lg font-bold text-[#202124] flex items-center">
          Similar apps available
        </h2>
        <div className="p-1 rounded-full text-[#5f6368] hover:text-[#202124] transition-colors cursor-pointer">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {similar.map((app) => (
          <div
            key={app.name}
            className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed] flex items-center space-x-3 hover:border-[#dadce0] hover:shadow-xs transition-all cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl ${app.iconBg} text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0`}>
              {app.symbol}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[#202124] text-xs truncate">{app.name}</div>
              <div className="text-[#5f6368] text-[11px] truncate">{app.category}</div>
              <div className="flex items-center space-x-2 text-[10px] text-[#5f6368] mt-1">
                <span className="flex items-center font-medium text-[#202124]">
                  {app.rating} <Star className="w-2.5 h-2.5 fill-[#0b57d0] text-[#0b57d0] ml-0.5" />
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
