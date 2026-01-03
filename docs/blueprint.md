# **App Name**: LoanLens

## Core Features:

- Firebase Authentication: Secure user authentication using Firebase Auth (Email/Password + Google)
- Loan Management: Add, edit, and delete loan details (name, amount, interest, EMI, dates). Auto-calculate total payable, remaining balance, and completion.
- Smart EMI Alerts: EMI due date alerts with color-coded risk indicators (green, yellow, red) to highlight loan status.
- Insight Cards: Display loan progress insights like 'You are X% done' and '₹Y remaining'.
- Data Visualization Dashboard: Visualize loan data with charts (EMI progress, monthly payments, loan distribution) using Recharts/Chart.js.  These charts update in real time from the database
- Demo Mode: Enable a 'Demo Mode' that loads pre-filled sample loan data for quick demonstration.
- Reminder Logic API Tool: A tool powered by LLM that decides when and how to set a scheduled logic to send EMI due reminders.

## Style Guidelines:

- Primary color: Deep teal (#008080) for a professional, trustworthy feel.
- Background color: Light teal (#E0F8F8), a desaturated version of the primary, for a calm and modern backdrop.
- Accent color: Soft olive green (#808000) to complement the primary and provide visual interest.
- Font pairing: 'Poppins' (sans-serif) for headlines and 'PT Sans' (sans-serif) for body text. Note: currently only Google Fonts are supported.
- Mobile-first design with responsive, touch-friendly cards and clean spacing for optimal UX on all devices.
- Smooth transitions using Framer Motion for a polished and engaging user experience.
- Consistent use of financial-themed icons throughout the UI, creating a familiar and trustworthy atmosphere.