// File location: app/waitlist/page.tsx
import BrevoWaitlistForm from "@/components/waitlistForm";

export default function WaitlistPage({
  searchParams,
}: {
  searchParams: { source?: string };
}) {
  return (
    <BrevoWaitlistForm />
  );
}