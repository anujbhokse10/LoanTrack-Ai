import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
            <Logo className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to manage your loans.</p>
        </div>
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
            </Link>
        </p>
      </div>
    </div>
  );
}
