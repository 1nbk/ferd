import { redirect } from "next/navigation";

export default function SuccessPage({ searchParams }: { searchParams: { reference: string; bookingId: string } }) {
  // If we end up here from old links, redirect to the unified confirmation page
  if (searchParams.bookingId) {
    redirect(`/confirmation/${searchParams.bookingId}?reference=${searchParams.reference}`);
  }
  
  // Fallback if no booking ID
  redirect("/");
}
