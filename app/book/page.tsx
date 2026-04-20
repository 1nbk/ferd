import { redirect } from "next/navigation";

export default function BookPage() {
  // Booking is done inline on the apartment and fleet pages.
  redirect("/apartment");
}
