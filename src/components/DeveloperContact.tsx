import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Mail, MapPin, Shield } from 'lucide-react';
import { APP_DATA } from '../data/appData';

export const DeveloperContact: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 border-b border-[#e8eaed] pb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between group py-2 text-left cursor-pointer"
      >
        <h2 className="text-lg font-bold text-[#202124] group-hover:text-[#0b57d0] transition-colors">
          Developer contact
        </h2>
        <div className="p-1 rounded-full text-[#5f6368] group-hover:text-[#202124] transition-colors">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {open && (
        <div className="mt-3 space-y-4 text-xs text-[#3c4043] animate-in fade-in duration-200">
          <div className="flex items-center space-x-3 p-3 bg-[#f8f9fa] rounded-xl border border-[#e8eaed]">
            <img
              src="/websyncdigital-logo.webp"
              alt="Websync Digital"
              className="w-8 h-8 rounded-lg object-contain bg-white p-1 border border-[#e8eaed]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="font-semibold text-[#202124]">{APP_DATA.developer}</div>
              <div className="text-[#5f6368] text-[11px]">Official Mobile Application Publisher</div>
            </div>
          </div>

          <div className="space-y-3 pl-1">
            <a
              href={APP_DATA.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-[#0b57d0] hover:underline"
            >
              <Globe className="w-4 h-4 text-[#5f6368]" />
              <span>Visit Website ({APP_DATA.developerUrl})</span>
            </a>

            <a
              href={`mailto:${APP_DATA.developerEmail}`}
              className="flex items-center space-x-3 text-[#0b57d0] hover:underline"
            >
              <Mail className="w-4 h-4 text-[#5f6368]" />
              <span>Email ({APP_DATA.developerEmail})</span>
            </a>

            <div className="flex items-center space-x-3 text-[#5f6368]">
              <MapPin className="w-4 h-4" />
              <span>Address: {APP_DATA.developerAddress}</span>
            </div>

            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert('Topit strictly protects your transaction logs, user identifiers, and utility tokens with bank-grade encryption.');
              }}
              className="flex items-center space-x-3 text-[#0b57d0] hover:underline"
            >
              <Shield className="w-4 h-4 text-[#5f6368]" />
              <span>Privacy Policy</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
