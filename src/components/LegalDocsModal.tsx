import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, RotateCcw, Check } from 'lucide-react';
import { LEGAL_DOCS, type LegalDoc } from '../data/legalDocs';

interface LegalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy' | 'refund' | 'security';
}

export const LegalDocsModal: React.FC<LegalDocsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refund' | 'security'>(initialTab);
  const [copied, setCopied] = useState(false);

  // Sync initial tab when modal opens
  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const currentDoc: LegalDoc = LEGAL_DOCS[activeTab] || LEGAL_DOCS.terms;

  const handleCopyText = async () => {
    const textContent = `${currentDoc.title}\nLast Updated: ${currentDoc.lastUpdated}\n\n` +
      currentDoc.sections.map(s => `${s.title}\n${s.content.join('\n')}`).join('\n\n');
    await navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#dadce0] rounded-3xl max-w-2xl w-full flex flex-col max-h-[90vh] shadow-2xl relative text-left my-4 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Close */}
        <div className="px-6 py-5 border-b border-[#e8eaed] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-[#0b57d0]">
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
              {activeTab === 'privacy' && <Lock className="w-5 h-5" />}
              {activeTab === 'refund' && <RotateCcw className="w-5 h-5" />}
              {activeTab === 'security' && <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202124] tracking-tight">{currentDoc.title}</h2>
              <p className="text-xs text-[#5f6368]">{currentDoc.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-xs text-[#3c4043] hover:text-[#202124] transition-colors flex items-center space-x-1.5 hidden sm:flex cursor-pointer"
              title="Copy text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#0b57d0]" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="px-6 py-2.5 bg-[#f8f9fa] border-b border-[#e8eaed] flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'refund', label: 'Refund Policy', icon: RotateCcw },
            { id: 'security', label: 'Data Safety', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1.5 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0b57d0] text-white shadow-md'
                    : 'bg-[#e8eaed] text-[#5f6368] hover:text-[#202124] hover:bg-[#dadce0]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Document Content (Scrollable) */}
        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-[#3c4043] leading-relaxed">
          <div className="flex items-center justify-between pb-3 border-b border-[#e8eaed] text-xs text-[#70757a]">
            <span>Official Policy Document • Websync Digital</span>
            <span>Last Updated: {currentDoc.lastUpdated}</span>
          </div>

          {currentDoc.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#202124] tracking-tight">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#5f6368] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Contact info box */}
          <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#e8eaed] space-y-1 text-xs text-[#5f6368]">
            <div className="font-semibold text-[#202124]">Need Clarification or Legal Inquiries?</div>
            <p>For questions regarding our terms, refunds, or privacy practices, reach our compliance team at:</p>
            <a href="mailto:support@websyncdigital.com" className="text-[#0b57d0] hover:underline font-medium inline-block mt-1">
              support@websyncdigital.com
            </a>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#e8eaed] bg-white flex items-center justify-between shrink-0">
          <span className="text-xs text-[#70757a]">Topit by Websync Digital</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#3c4043] text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
