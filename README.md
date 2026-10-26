# IndianHelper SG — Prototype

Clickable front-end prototype of the Indian Helper Portal (Singapore). React + Vite + Tailwind CSS, HashRouter, no backend — state lives in React + localStorage.

## Run
```bash
npm install
npm run dev          # local dev
npm run build        # production build -> dist/
npm run preview      # serve the build
```

## What's in it
- **Home** — hero search (keyword + main job → Browse), stats strip, How it works (Helpers free / Employers pay to reveal), featured helper cards, testimonials, Hiring Journey teaser (6 stages), pricing teaser, FAQ accordion, multi-column footer with the not-an-agency line.
- **Browse** — 12 fictional Indian helper profiles; live filters (keyword, status, main job, state, language, max salary slider, max rest days, pure-veg toggle), sorting, collapsible filter sidebar on mobile.
- **Profile** — full profile free; only the number is hidden. Reveal costs 1 credit; revealed sample numbers are obviously fictional (+65 8000 0001…) and saved to My Reveals with Call / WhatsApp and a 7-day wrong-number report that restores the credit.
- **Pricing** — Single ₹499 / Pack of 5 ₹1,499 (Popular, ₹300 per reveal) / Pack of 10 ₹2,499 (₹250 per reveal), one-time packs paid by **UPI**. Mock UPI checkout: Google Pay / PhonePe / Paytm badges, QR placeholder, UPI ID field, "I've paid — verify & continue".
- **Hiring Journey** — 7 expandable stage sections (0–6), an interactive cost calculator **in S$** (salary + levy S$300/S$60, SIP, EOP → monthly / one-time / first-year + agency comparison) and a Transfer Process Tracker that persists ticks to localStorage.
- **Join as a Helper** — free profile form (§8 fields, grouped), required-field validation, and rest-days = 0 is blocked with the legal explanation (at least 1 rest day a month is required by law).
- **Terms / Privacy** — short prototype summaries.

## Money rule in this product
- Portal's own charges: **INR (₹), via UPI** — reveal packs only.
- Everything Singapore: **SGD (S$)** — helper salaries, MOM levy, SIP, EOP, insurance, agency-fee comparison.
- Sample profiles, people and numbers are fictional. Not deployed, not pushed anywhere.
