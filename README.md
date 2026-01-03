# LoanLens - Smart Loan Monitoring Assistant

LoanLens is a smart loan monitoring and repayment assistant designed to help users track active loans, visualize repayment progress, and avoid missed EMIs through intelligent alerts.

Built for a hackathon, this MVP is production-ready, focusing on a clean, responsive, and intuitive user experience.

## 🚀 Key Features

- **🔐 Secure Authentication**: Firebase-powered sign-up and login with Email/Password and Google.
- **📊 Unified Dashboard**: View all your loans, key stats, and visualizations in one place.
- **💡 Smart Loan Management**: Add, edit, and delete loans with auto-calculated balances and progress.
- **🔔 Intelligent EMI Alerts**: Visual cues (on track, upcoming, overdue) keep you informed about your next payment.
- **📈 Data Visualization**: Interactive charts from Recharts provide insights into your financial health, including loan distribution and repayment timelines.
- **🤖 AI-Powered Reminders**: A GenAI-powered tool suggests an optimal reminder schedule based on your loan details and risk profile.
- **📱 Demo Mode**: Instantly populate the app with sample data for a quick and comprehensive demonstration.
- **🎨 Modern Fintech UI**: A sleek, mobile-first design built with Next.js, Tailwind CSS, and Shadcn UI.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Backend & Auth**: Firebase (Auth, Firestore)
- **Styling**: Tailwind CSS & Shadcn UI
- **Charts**: Recharts
- **Forms**: React Hook Form & Zod
- **AI**: Google AI & Genkit

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd loanlens
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password and Google providers).
    - Enable **Firestore Database**.
    - Go to Project Settings and copy your web app's Firebase configuration.
    - Create a `.env.local` file in the root of your project and add your Firebase config keys:
      ```
      NEXT_PUBLIC_FIREBASE_API_KEY=...
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
      NEXT_PUBLIC_FIREBASE_APP_ID=...
      ```
    - Update the Firebase config in `src/lib/firebase.ts` to use these environment variables.

4. **Set up Google AI:**
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key.
    - Add the key to your `.env.local` file:
      ```
      GOOGLE_API_KEY=...
      ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:9002`.

6.  **Run the Genkit development server (in a separate terminal):**
    ```bash
    npm run genkit:dev
    ```

## 📜 Demo Script (3-Minute Flow)

1.  **Welcome (30s)**:
    - Open the app. Notice the clean, welcoming landing page.
    - Click "Get Started" and sign up for a new account using email/password.

2.  **Dashboard First Look (60s)**:
    - After login, you land on the dashboard. It's currently empty.
    - Toggle on **"Demo Mode"** in the header. The dashboard populates with sample loans.
    - Briefly point out the key stats at the top: Total Balance, Next EMI, etc.
    - Scroll down to the loan cards. Notice the color-coded status tags: `On Track`, `Due Soon`, and `Overdue`.

3.  **Loan Details & Charts (60s)**:
    - Click on the "Home Loan" card.
    - Point out the progress bar, remaining amount, and tenure details.
    - Show the charts section below, highlighting the **Loan Distribution** pie chart and the **Payment Schedule** bar chart.

4.  **AI Smart Reminders (30s)**:
    - On the "Car Loan" card, click the "Smart Alerts" button (bell icon).
    - A dialog opens. Explain that this feature uses AI to suggest a reminder schedule.
    - Click "Generate" and showcase the AI-generated configuration.

5.  **Conclusion**:
    - "And that's LoanLens—a smart assistant to help you stay on top of your loans, all in a simple, visual dashboard."
