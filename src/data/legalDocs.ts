export interface LegalDocSection {
  title: string;
  content: string[];
}

export interface LegalDoc {
  id: 'terms' | 'privacy' | 'refund' | 'security';
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalDocSection[];
}

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  terms: {
    id: 'terms',
    title: 'Terms of Service',
    subtitle: 'Please read these terms carefully before using Topit.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: [
          'By downloading, accessing, or using the Topit mobile application or website ("Services"), provided by Websync Digital ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.',
          'These terms apply to all registered users, visitors, and others who access or use the Service in Nigeria and internationally.'
        ]
      },
      {
        title: '2. Eligibility & Account Security',
        content: [
          'You must be at least 18 years of age or have parental/guardian consent to use Topit.',
          'You are responsible for maintaining the confidentiality of your account credentials, 4-digit transaction PIN, and biometric authentication security.',
          'You agree to notify Topit support immediately of any unauthorized access to or use of your account.'
        ]
      },
      {
        title: '3. Wallet Funding & Virtual Accounts',
        content: [
          'Topit provides dedicated 24/7 virtual bank account numbers powered by licensed payment partners (e.g., Monnify, Paystack) for instant wallet funding.',
          'All deposits are credited automatically to your Topit wallet balance. You are responsible for ensuring that bank transfers are made to your assigned account number.',
          'Topit is not a bank; funds in your Topit wallet represent prepaid utility credits for mobile data, airtime, and value-added telecommunication services.'
        ]
      },
      {
        title: '4. Data & Airtime Purchases',
        content: [
          'Topit processes direct telecommunications top-ups across supported networks including MTN, Airtel, and Glo.',
          'Users are solely responsible for entering the correct recipient phone number and selecting the desired network and data plan. Once delivered successfully by the network carrier, airtime and data purchases cannot be recalled or transferred to another number.',
          'Delivery typically completes in 2 to 5 seconds. During telecom carrier downtime, transactions may enter a high-traffic processing queue and complete automatically once the network recovers.'
        ]
      },
      {
        title: '5. Cashback & Rewards Program',
        content: [
          'Topit offers an instant 0.5% cashback bonus on eligible data and airtime purchases.',
          'Cashback is credited directly to your in-app rewards vault and can be redeemed into your spendable wallet balance at any time with zero redemption fees.',
          'Cashback rates, referral bonuses, and promotional rewards are subject to periodic review by Websync Digital.'
        ]
      },
      {
        title: '6. Automated Recurring Subscriptions',
        content: [
          'Users may opt-in to automated top-ups on a daily, 48-hour, weekly, or monthly schedule.',
          'Automated subscriptions execute automatically only if sufficient wallet balance is available at the scheduled interval. You can pause or cancel automated subscriptions at any time directly from the app settings.'
        ]
      },
      {
        title: '7. Prohibited Use & Account Termination',
        content: [
          'You agree not to use Topit for fraudulent financial transfers, money laundering, automated scraping, reverse engineering, or unauthorized commercial resale outside authorized reseller channels.',
          'Websync Digital reserves the right to suspend or terminate accounts that violate these terms or engage in abusive conduct.'
        ]
      },
      {
        title: '8. Limitation of Liability & Governing Law',
        content: [
          'To the maximum extent permitted by applicable law, Websync Digital shall not be liable for indirect, incidental, or consequential damages arising from telecom network carrier downtime or incorrect user inputs.',
          'These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.'
        ]
      }
    ]
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How Topit collects, uses, and safeguards your personal information.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: '1. Information We Collect',
        content: [
          'Account Information: Name, email address, phone number, and encrypted password hash created during registration.',
          'Transaction Data: Records of data plans purchased, airtime amounts, recipient phone numbers, timestamps, and digital receipts.',
          'Virtual Account Information: Assigned bank names and virtual account numbers generated for wallet funding.',
          'Device & Security Tokens: Expo Push Notification tokens and anonymous device IDs for push alert delivery and account protection.'
        ]
      },
      {
        title: '2. Biometric Data Privacy (Zero Cloud Storage)',
        content: [
          'Topit supports Fingerprint, Touch ID, and Face ID authentication for frictionless payment verification.',
          'CRITICAL PRIVACY GUARANTEE: Your biometric data (fingerprints and facial scans) NEVER leaves your physical device. All biometric scans are processed exclusively by your phone’s secure hardware enclave (Android Keystore / iOS Secure Enclave). Topit servers never capture, receive, or store biometric templates.'
        ]
      },
      {
        title: '3. How We Use Your Information',
        content: [
          'To process telecom top-ups, deliver data/airtime, and credit wallet balances.',
          'To calculate and disburse 0.5% cashback rewards and referral bonuses.',
          'To send instant push notifications for wallet deposits, automated renewals, and receipt confirmations.',
          'To prevent fraudulent transactions, abuse, and unauthorized account access.'
        ]
      },
      {
        title: '4. Data Sharing & Third Parties',
        content: [
          'We do not sell, rent, or trade your personal data to third parties for advertising or marketing.',
          'We share necessary transaction data strictly with licensed partners to fulfill your requests: (a) Telecom operators (MTN, Airtel, Glo) to deliver bundles; (b) CBN-licensed payment gateways (Monnify, Paystack) for virtual account transfers; (c) Supabase cloud infrastructure with TLS 1.3 encryption.'
        ]
      },
      {
        title: '5. Data Retention & Your Rights (NDPR Compliance)',
        content: [
          'We retain your account and transaction ledger in compliance with financial record-keeping regulations.',
          'Under the Nigeria Data Protection Regulation (NDPR), you have the right to access your personal data, request corrections, or request account closure by contacting privacy@websyncdigital.com.'
        ]
      }
    ]
  },
  refund: {
    id: 'refund',
    title: 'Refund & Reversal Policy',
    subtitle: 'Clear rules on failed transactions, wallet reversals, and dispute resolution.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: '1. Automated Instant Wallet Reversals',
        content: [
          'If a data or airtime top-up fails due to carrier network unavailability or system errors, Topit automatically cancels the charge and reverses 100% of the funds back to your wallet balance instantly (typically under 60 seconds).',
          'You will receive a notification and a corresponding ledger entry in your History tab showing the refunded transaction.'
        ]
      },
      {
        title: '2. Queued / Pending Transactions',
        content: [
          'During extreme carrier network maintenance, orders may temporarily show as "Queued". Our automated queue worker retries the delivery periodically.',
          'If a queued order cannot be fulfilled by the carrier within 30 minutes, it is automatically marked failed and your wallet is fully refunded.'
        ]
      },
      {
        title: '3. Uncredited Bank Transfer Deposits',
        content: [
          'Virtual account transfers reflect in your wallet within 3 to 10 seconds. In rare cases of interbank network switching delays (NIP downtime), deposits may take longer.',
          'If your bank transfer has not reflected within 15 minutes, tap "Contact Support" in Settings or email support@websyncdigital.com with your transaction session ID or bank debit proof for manual verification.'
        ]
      },
      {
        title: '4. Incorrect Phone Number Policy',
        content: [
          'Because telecommunication deliveries occur instantly and irrevocably, airtime or data successfully delivered to a wrong number provided by the user cannot be recalled or refunded.',
          'Always double-check recipient phone numbers before swiping to confirm payment.'
        ]
      }
    ]
  },
  security: {
    id: 'security',
    title: 'Data Safety & Security Overview',
    subtitle: 'How Topit protects your money, identity, and transactions.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: '1. Encryption & Data Transit',
        content: [
          'All communication between the Topit app, edge functions, and payment servers is encrypted using modern TLS 1.3 encryption with 256-bit AES algorithms.',
          'Your passwords and transaction PINs are cryptographically salted and hashed; plain-text credentials are never stored on any server.'
        ]
      },
      {
        title: '2. 4-Strike Keypad Lockout Protection',
        content: [
          'To prevent brute-force attacks on your wallet, Topit enforces a strict security lockout: entering an incorrect 4-digit PIN 4 consecutive times immediately locks the keypad for 2 minutes (120 seconds).',
          'A live countdown timer is displayed, and all transactions are halted until the cooldown expires or you reset your PIN using your master account password.'
        ]
      },
      {
        title: '3. Dedicated Virtual Bank Account Security',
        content: [
          'Virtual accounts assigned to Topit users are issued through CBN-licensed payment partners and protected by automated webhook validation, HMAC signature verification, and automated ledger balancing.'
        ]
      }
    ]
  }
};
