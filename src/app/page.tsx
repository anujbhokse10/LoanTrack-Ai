'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '@/components/shared/logo';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: 'Visualize Your Progress',
      description: 'See your loan repayment journey with interactive charts and progress bars.',
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: 'Never Miss an EMI',
      description: 'Get smart, color-coded alerts for upcoming and overdue payments.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: 'All Loans in One Place',
      description: 'A unified dashboard to manage all your loans, from home to personal.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <header className="p-4 flex justify-between items-center container mx-auto">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-primary">LoanTrack AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tighter mb-4">
              Financial clarity for your loans.
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-8">
              LoanTrack AI is the smart way to monitor your loans. Visualize progress, manage EMIs, and stay on track with intelligent alerts.
            </p>
            <Button size="lg" asChild className="font-bold">
              <Link href="/signup">
                Start Tracking for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={800}
                className="rounded-xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
             <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl -z-10"></div>
             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/10 rounded-full filter blur-2xl -z-10"></div>
          </motion.div>
        </div>

        <section className="mt-24 md:mt-32">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">All-in-one Loan Management</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-sm text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LoanTrack AI. All Rights Reserved.
      </footer>
    </div>
  );
}
