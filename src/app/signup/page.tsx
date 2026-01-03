import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
            <Logo className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary">Create Your Account</h1>
            <p className="text-muted-foreground">Start tracking your loans in seconds.</p>
        </div>
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
