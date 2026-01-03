import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-area-chart", className)}
  >
    <path d="M3 3v18h18" />
    <path d="M7 12v5h12V8l-5 5-4-4Z" />
  </svg>
);
