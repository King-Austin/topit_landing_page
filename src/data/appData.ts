export interface Review {
  id: string;
  author: string;
  avatarColor: string;
  rating: number;
  date: string;
  reviewText: string;
  helpfulCount: number;
  developerResponse?: {
    date: string;
    text: string;
  };
}

export interface FeatureSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  colorGradient: string;
  screenType: 'data' | 'airtime' | 'rewards' | 'wallet' | 'receipt' | 'automations';
}

export const APP_DATA = {
  name: 'Topit',
  fullName: 'Topit: Instant Data, Airtime & Rewards',
  developer: 'Websync Digital',
  developerUrl: 'https://websyncdigital.com',
  developerEmail: 'support@websyncdigital.com',
  developerAddress: 'Lagos, Nigeria',
  category: 'Finance',
  inAppDetails: 'Contains ads • In-app purchases',
  rating: 4.8,
  reviewCountDisplay: '14.8K reviews',
  downloadsDisplay: '50K+',
  contentRating: 'Rated for 3+',
  contentRatingNote: 'Digital Purchases',
  lastUpdated: 'August 28, 2026',
  about: `Topit is your high-speed, automated VTU and data top-up platform designed for instant connectivity, massive savings, and continuous cashback rewards.

⚡ Core Features & Capabilities:
• Cheap SME & Direct Data: Buy cheap data bundles for MTN, Airtel, and Glo at wholesale discount prices with instant 2-second automated delivery.
• Daily, Weekly & Night Plans: Choose curated data bundles tailored to your browsing needs with real-time balance tracking.
• Instant Airtime Recharge: Top up airtime on all major Nigerian networks with automated delivery and instant cashback earnings.
• Cashback & Referral Rewards: Earn real cashback on every single recharge. Redeem your accumulated cashback straight into your wallet anytime.
• Dedicated Virtual Accounts: Get instant dedicated virtual bank accounts (Moniepoint MFB, Wema Bank, etc.) for zero-delay, automated wallet funding.
• Smart Automations & Auto-Recharge: Schedule automated top-ups at intervals (daily, weekly, or monthly) so your devices never disconnect.
• Instant Branded Receipts: Download and share professional PDF and PNG transaction receipts with reference tracking for personal records or reselling proof.
• Biometric & PIN Security: Hardware-backed encryption, fingerprint/face login, and secure transaction PIN protection.`,
  tags: [
    'Finance',
    'Utilities',
    'Cheap SME Data',
    'Airtime Top-Up',
    'Cashback Rewards',
    'Smart Wallet',
    'Automations'
  ],
  featureSlides: [
    {
      id: 'slide-1',
      title: 'Buy Cheap SME & Direct Data at Wholesale Prices!',
      subtitle: 'Instant 2-second automated delivery for MTN, Airtel & Glo',
      badge: 'Wholesale Rates',
      iconName: 'Smartphone',
      colorGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      screenType: 'data'
    },
    {
      id: 'slide-2',
      title: 'Airtime Recharge with Instant Cashback Rewards',
      subtitle: 'Earn real cashback on every top-up and redeem anytime',
      badge: 'Cashback on Every Recharge',
      iconName: 'Gift',
      colorGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      screenType: 'rewards'
    },
    {
      id: 'slide-3',
      title: 'Dedicated Virtual Accounts for Instant Funding',
      subtitle: 'Automated wallet funding via Moniepoint & Wema Bank',
      badge: '99.9% Uptime',
      iconName: 'Wallet',
      colorGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      screenType: 'wallet'
    },
    {
      id: 'slide-4',
      title: 'Set Smart Automations & Never Run Out of Data',
      subtitle: 'Schedule recurring daily, weekly, or monthly auto-topups',
      badge: 'Zero Disruption',
      iconName: 'Clock',
      colorGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      screenType: 'automations'
    },
    {
      id: 'slide-5',
      title: 'Generate & Export Branded Receipts in PDF & PNG',
      subtitle: 'Clean, verified proof with one tap for records and reselling',
      badge: 'Instant Receipt Proof',
      iconName: 'Receipt',
      colorGradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      screenType: 'receipt'
    }
  ] as FeatureSlide[],
  reviews: [
    {
      id: 'rev-1',
      author: 'Chinedu Okonkwo',
      avatarColor: 'bg-emerald-600',
      rating: 5,
      date: 'August 24, 2026',
      reviewText:
        'Hands down the fastest data and airtime app in Nigeria! My MTN SME data was delivered in literally 2 seconds after funding my wallet. Also the PDF receipt generator is super clean for my data reselling customers.',
      helpfulCount: 142,
      developerResponse: {
        date: 'August 25, 2026',
        text: 'Thank you Chinedu! We are dedicated to providing the fastest 100% automated delivery.'
      }
    },
    {
      id: 'rev-2',
      author: 'Blessing Adeleke',
      avatarColor: 'bg-blue-600',
      rating: 5,
      date: 'August 19, 2026',
      reviewText:
        'The cashback system is amazing. I earn cashback on all my Airtel airtime and data purchases, and I redeemed ₦1,800 back into my main wallet this morning without issues.',
      helpfulCount: 98
    },
    {
      id: 'rev-3',
      author: 'Ibrahim Musa',
      avatarColor: 'bg-purple-600',
      rating: 5,
      date: 'August 14, 2026',
      reviewText:
        'The UI is super smooth and responsive. Dedicated virtual account funding with Moniepoint reflects instantly with zero delay. Top work Websync Digital!',
      helpfulCount: 76,
      developerResponse: {
        date: 'August 15, 2026',
        text: 'Glad you enjoy the clean experience Ibrahim! More rewards and features are coming.'
      }
    },
    {
      id: 'rev-4',
      author: 'Amina Yusuf',
      avatarColor: 'bg-amber-600',
      rating: 5,
      date: 'August 09, 2026',
      reviewText:
        'The auto-recharge automation is a lifesaver for my Wi-Fi router. I set it to renew every week and never worry about sudden disconnection.',
      helpfulCount: 43
    },
    {
      id: 'rev-5',
      author: 'Emmanuel Bassey',
      avatarColor: 'bg-rose-600',
      rating: 5,
      date: 'August 02, 2026',
      reviewText:
        'Cheapest SME data rates anywhere and biometric fingerprint login makes checking balance and sending recharges super fast.',
      helpfulCount: 51
    }
  ] as Review[],
  ratingBreakdown: [
    { stars: 5, percentage: 89 },
    { stars: 4, percentage: 8 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 }
  ]
};
