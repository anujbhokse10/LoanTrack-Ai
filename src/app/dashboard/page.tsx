import DashboardClient from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
  // In a real app, you might fetch initial user loans here and pass them as props
  // to DashboardClient. For this MVP, we'll handle it client-side with demo data.
  return (
    <DashboardClient />
  );
}
