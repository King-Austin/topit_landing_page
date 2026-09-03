# Data Safety & Security Overview

**Last Updated:** September 2026  
**Publisher:** Websync Digital ("Topit", "we", "our", "us")  
**Contact:** [security@websyncdigital.com](mailto:security@websyncdigital.com)

---

## 1. Encryption & Data Transit
All communication between the Topit app, edge functions, and payment servers is encrypted using modern **TLS 1.3 encryption with 256-bit AES algorithms**.

Your passwords and transaction PINs are cryptographically salted and hashed; plain-text credentials are never stored on any server or in database logs.

---

## 2. 4-Strike Keypad Lockout Defense
To protect user wallets from automated or unauthorized brute-force PIN guessing, Topit enforces a security lockout:
- Entering an incorrect 4-digit PIN 4 consecutive times immediately locks the keypad for **2 minutes (120 seconds)**.
- A live countdown timer is displayed on the screen, disabling all numeric and biometric inputs until the cooldown reaches `00:00` or you perform an authorized password reset.

---

## 3. On-Device Biometric Security Enclave
Topit leverages native Android Keystore and iOS Secure Enclave technologies:
- Your fingerprints and Face ID scans are processed locally by your device hardware and never transmitted to Topit servers.
- Transaction signing keys are stored in encrypted hardware keystores accessible only when your device is unlocked.

---

## 4. Dedicated Virtual Bank Account Security
Virtual accounts assigned to Topit users are issued through CBN-licensed payment partners (Monnify, Paystack) and protected by:
- Automated webhook HMAC-SHA512 signature validation.
- Real-time ledger reconciliation.
- Multi-factor authenticated administrative oversight.
