import React, { useState } from 'react';
import { Star, ThumbsUp, ArrowRight, Info, Check, MessageSquare } from 'lucide-react';
import { APP_DATA } from '../data/appData';


export const RatingsAndReviews: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | 'positive'>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const toggleHelpful = (id: string) => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredReviews = APP_DATA.reviews.filter((review) => {
    if (selectedFilter === '5') return review.rating === 5;
    if (selectedFilter === '4') return review.rating === 4;
    if (selectedFilter === 'positive') return review.rating >= 4;
    return true;
  });

  return (
    <div id="ratings-section" className="my-6 border-b border-[#282a2c] pb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between py-2">
        <h2 className="text-lg font-bold text-[#f1f3f4] flex items-center">
          Ratings and reviews
        </h2>
        <div className="p-1 rounded-full text-[#9aa0a6] hover:text-white transition-colors cursor-pointer">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>

      {/* Verified Notice */}
      <div className="flex items-center text-xs text-[#9aa0a6] mb-5">
        <span>Ratings and reviews are verified and are from people who use the same type of device that you use.</span>
        <Info className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#80868b]" />
      </div>

      {/* Histogram & Big Rating Header */}
      <div className="flex items-center gap-6 sm:gap-10 mb-6">
        {/* Big Score */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="text-5xl font-bold text-[#f1f3f4] tracking-tight">{APP_DATA.rating}</div>
          <div className="flex items-center space-x-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.floor(APP_DATA.rating)
                    ? 'fill-[#3b82f6] text-[#3b82f6]'
                    : star === 5
                    ? 'fill-[#3b82f6]/80 text-[#3b82f6]/80'
                    : 'fill-[#5f6368] text-[#5f6368]'
                }`}
              />
            ))}
          </div>
          <div className="text-[11px] text-[#9aa0a6] mt-1.5">{APP_DATA.reviewCountDisplay}</div>
        </div>

        {/* Breakdown Horizontal Progress Bars */}
        <div className="flex-1 space-y-1.5">
          {APP_DATA.ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center space-x-2 text-xs">
              <span className="w-2 font-medium text-[#c4c7c5] text-right">{item.stars}</span>
              <div className="flex-1 h-2.5 bg-[#282a2c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3b82f6] rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-4">
        {[
          { id: 'all', label: 'All reviews' },
          { id: 'positive', label: 'Positive' },
          { id: '5', label: '5 stars' },
          { id: '4', label: '4 stars' }
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedFilter(chip.id as any)}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors flex items-center space-x-1 ${
              selectedFilter === chip.id
                ? 'bg-[#1e3a5f] text-[#93c5fd] border border-[#3b82f6]'
                : 'bg-[#1e1e1e] text-[#c4c7c5] border border-[#333] hover:bg-[#282a2c]'
            }`}
          >
            {selectedFilter === chip.id && <Check className="w-3 h-3 mr-0.5" />}
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Review Cards List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => {
          const isVoted = helpfulVotes[review.id];
          const count = review.helpfulCount + (isVoted ? 1 : 0);

          return (
            <div key={review.id} className="space-y-2 text-xs">
              {/* Author & Avatar */}
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full ${review.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-inner`}>
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-[#f1f3f4] text-sm">{review.author}</div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <div className="flex items-center space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating
                              ? 'fill-[#3b82f6] text-[#3b82f6]'
                              : 'fill-[#5f6368] text-[#5f6368]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#9aa0a6] text-[11px]">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-[#d2e3fc]/90 leading-relaxed text-xs sm:text-sm pl-11">
                {review.reviewText}
              </p>

              {/* Helpful vote action */}
              <div className="flex items-center space-x-4 text-[#9aa0a6] pl-11 pt-1">
                <span className="text-[11px]">{count} people found this review helpful</span>
                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center space-x-1 text-xs py-1 px-2.5 rounded-full border transition-colors ${
                    isVoted
                      ? 'bg-[#1e3a5f]/80 text-[#93c5fd] border-[#3b82f6]'
                      : 'border-[#333] hover:bg-[#282a2c] text-[#c4c7c5]'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful</span>
                </button>
              </div>

              {/* Developer Response Box */}
              {review.developerResponse && (
                <div className="ml-11 mt-2.5 p-3 rounded-xl bg-[#1e2022] border border-[#2d3033] space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[#8ab4f8] font-semibold">
                    <div className="flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{APP_DATA.developer}</span>
                    </div>
                    <span className="text-[11px] text-[#9aa0a6] font-normal">
                      {review.developerResponse.date}
                    </span>
                  </div>
                  <p className="text-[#9aa0a6] leading-normal pt-0.5">
                    {review.developerResponse.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
