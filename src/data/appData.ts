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
  imagePath?: string;
}

export const APP_DATA = {
  name: 'Topit',
  fullName: 'Topit: Instant Data, Airtime & Rewards',
  developer: 'Websync Digital',
  developerUrl: 'https://websyncdigital.com',
  developerEmail: 'support@websyncdigital.com',
  developerAddress: 'Lagos, Nigeria',
  category: 'Finance',
  inAppDetails: 'In-app purchases',
  rating: 4.8,
  reviewCountDisplay: '700 reviews',
  downloadsDisplay: '1K+',
  contentRating: 'Rated for 3+',
  about: `For years, buying mobile data and airtime has been broken. Slow banking apps, clunky forms, failed transactions, and zero rewards.

Today, we are changing that forever.

Meet Topit. It is not just an app — it is the most powerful, effortless connectivity experience ever built. Insanely fast, designed to save you real money, and engineered to just work.

What makes Topit revolutionary:

• Unbelievably Fast Delivery (2 Seconds): Direct, wholesale-priced data across MTN, Airtel, and Glo delivered in under two seconds with zero waiting.
• Curated for the Way You Live: Daily streams, weekly grinds, midnight downloads — tailored bundles with real-time balance tracking.
• Recharge Reimagined: Top up airtime on any Nigerian network with a single fluid swipe.
• Real Cashback on Every Byte: Topit pays you 0.5% instant cashback on every single transaction. Real spendable cash, straight into your wallet.
• Dedicated Virtual Bank Accounts: Instant dedicated virtual account funding with zero-delay automated deposits.
• Smart Automations: Schedule recurring data top-ups daily, weekly, or monthly so you never experience unexpected disconnections.
• Instant Branded Receipts: Download and share professional PDF and PNG transaction receipts with reference tracking.
• Hardware-Level Security: Protected by biometric fingerprint and Face ID authentication with 4-strike security lockout defense.

It is not just better data. It is the future of staying connected.`,
  tags: [
    'Insanely Fast Data',
    'One-Swipe Recharge',
    '0.5% Real Cash Back',
    'Personal Bank Vault',
    'Never Disconnect',
    'Biometric Security',
    'Instant Digital Proof'
  ],
  featureSlides: [
    {
      id: 'slide-1',
      title: 'Buy Cheap SME & Direct Data at Wholesale Prices!',
      subtitle: 'Instant automated delivery for MTN, Airtel & Glo',
      badge: 'Wholesale Rates',
      iconName: 'Smartphone',
      colorGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      screenType: 'data',
      imagePath: '/feature-data.webp'
    },
    {
      id: 'slide-2',
      title: 'Set Smart Automations & Never Run Out of Data',
      subtitle: 'Automate data and airtime renewals in seconds',
      badge: 'Smart Automations',
      iconName: 'Clock',
      colorGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      screenType: 'automations',
      imagePath: '/feature-rewards.webp'
    },
    {
      id: 'slide-3',
      title: 'Top Up Airtime in Seconds with Instant Delivery',
      subtitle: 'Fast, simple, and reliable airtime top-ups',
      badge: 'Instant Airtime',
      iconName: 'Smartphone',
      colorGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      screenType: 'airtime',
      imagePath: '/feature-wallet.webp'
    }
  ] as FeatureSlide[],
  reviews: [
    {
      id: 'rev-1',
      author: 'Chinedu Okonkwo',
      avatarColor: 'bg-blue-600',
      rating: 5,
      date: 'September 1, 2026',
      reviewText:
        'I resell data bundles to students and clients. Before Topit, dealing with delayed bank deposits and unverified delivery was a constant headache. Now I fund my dedicated virtual account, dispatch SME bundles in seconds, and share the PDF receipt directly to WhatsApp. Has cut customer disputes down to zero.',
      helpfulCount: 142,
      developerResponse: {
        date: 'September 1, 2026',
        text: 'Thank you Chinedu! Reliable delivery speed and traceable receipts are our top priority for reseller workflows.'
      }
    },
    {
      id: 'rev-2',
      author: 'Blessing Adeleke',
      avatarColor: 'bg-blue-600',
      rating: 5,
      date: 'September 1, 2026',
      reviewText:
        'Working remotely means burning through data on Figma and client calls. I set up the weekly auto-renewal on my MTN line, so I haven’t had a single mid-meeting disconnect this month. The 0.5% cashback quietly accumulated around ₦1,800, which covered my weekend browsing.',
      helpfulCount: 98
    },
    {
      id: 'rev-3',
      author: 'Ibrahim Musa',
      avatarColor: 'bg-purple-600',
      rating: 5,
      date: 'September 1, 2026',
      reviewText:
        'Most VTU apps in Nigeria feel bloated with ads and sluggish menus. Topit is fast and minimal. The biometric fingerprint key on the keypad saves me from typing a 4-digit PIN every single time I need a quick top-up on the go. Clean interface with no unnecessary steps.',
      helpfulCount: 76,
      developerResponse: {
        date: 'September 1, 2026',
        text: 'Glad to hear this Ibrahim! We built the biometric swipe flow specifically to eliminate friction on repeat top-ups.'
      }
    },
    {
      id: 'rev-4',
      author: 'Amina Yusuf',
      avatarColor: 'bg-amber-600',
      rating: 5,
      date: 'September 1, 2026',
      reviewText:
        'I manage multiple devices across Airtel and MTN lines for content creation. The wholesale SME rates cut our team’s monthly connectivity budget by about 30%, and having transparent receipts in the History tab makes monthly expense tracking effortless.',
      helpfulCount: 43
    },
    {
      id: 'rev-5',
      author: 'Emmanuel Bassey',
      avatarColor: 'bg-rose-600',
      rating: 4,
      date: 'September 1, 2026',
      reviewText:
        'Reliable utility for keeping staff and dispatch phones active. Virtual account funding reflects in under 5 seconds, and if a telecom carrier fails, the wallet reverses automatically without having to message support. Would love bulk contact selection in the next build.',
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
