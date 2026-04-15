"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function blockDates(data: { roomId?: string; carId?: string; date: Date; reason?: string }) {
  try {
    await prisma.blockedDate.create({
      data: {
        roomId: data.roomId || null,
        carId: data.carId || null,
        date: data.date,
        reason: data.reason
      }
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to block dates:", error);
    return { success: false, error: "Failed to block dates" };
  }
}

export async function deleteBlockedDate(id: string) {
  try {
    await prisma.blockedDate.delete({
      where: { id }
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blocked date:", error);
    return { success: false, error: "Failed to delete blocked date" };
  }
}

export async function verifyGuestId(guestId: string) {
  try {
    await prisma.guest.update({
      where: { id: guestId },
      data: { idVerified: true }
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to verify guest ID:", error);
    return { success: false, error: "Failed to verify ID" };
  }
}
