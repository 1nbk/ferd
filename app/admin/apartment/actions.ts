"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface BlockDateArgs {
  resourceId: string;
  resourceType: "room" | "car";
  date: string;
  reason?: string;
}

export async function blockDate({ resourceId, resourceType, date, reason }: BlockDateArgs) {
  try {
    await prisma.blockedDate.create({
      data: {
        roomId: resourceType === "room" ? resourceId : null,
        carId: resourceType === "car" ? resourceId : null,
        date: new Date(date),
        reason: reason || null,
      },
    });
    revalidatePath("/admin/apartment");
    revalidatePath("/admin/fleet");
    return { success: true };
  } catch (error) {
    console.error("Block date error:", error);
    return { success: false, error: "Could not block date." };
  }
}

export async function unblockDate(blockedDateId: string, revalidateRoute: string) {
  try {
    await prisma.blockedDate.delete({ where: { id: blockedDateId } });
    revalidatePath(revalidateRoute);
    return { success: true };
  } catch (error) {
    console.error("Unblock date error:", error);
    return { success: false, error: "Could not unblock date." };
  }
}
