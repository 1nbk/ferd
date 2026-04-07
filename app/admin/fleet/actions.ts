"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function blockCarDate(carId: string, date: string, reason?: string) {
  try {
    await prisma.blockedDate.create({
      data: {
        carId,
        date: new Date(date),
        reason: reason || null,
      },
    });
    revalidatePath("/admin/fleet");
    return { success: true };
  } catch (error) {
    console.error("Block car date error:", error);
    return { success: false, error: "Could not block date." };
  }
}
