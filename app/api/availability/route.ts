import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eachDayOfInterval } from "date-fns";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const carId = searchParams.get("carId");

  if (!roomId && !carId) {
    return NextResponse.json({ error: "roomId or carId required" }, { status: 400 });
  }

  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    // 1. Get all active bookings for this resource
    const bookings = await prisma.booking.findMany({
      where: {
        ...(roomId ? { roomId } : { carId }),
        OR: [
          { status: "CONFIRMED" },
          { 
            status: "PENDING",
            createdAt: { gte: thirtyMinutesAgo }
          }
        ]
      },
      select: { checkIn: true, checkOut: true },
    });

    // 2. Get admin-blocked dates
    const blockedDates = await prisma.blockedDate.findMany({
      where: {
        ...(roomId ? { roomId } : { carId }),
      },
      select: { date: true },
    });

    // 3. Expand booking ranges into individual dates
    const bookedDays: string[] = [];

    for (const booking of bookings) {
      const days = eachDayOfInterval({
        start: new Date(booking.checkIn),
        end: new Date(booking.checkOut),
      });
      days.forEach((d) => bookedDays.push(d.toISOString().split("T")[0]));
    }

    // 4. Add admin-blocked single dates
    for (const bd of blockedDates) {
      bookedDays.push(new Date(bd.date).toISOString().split("T")[0]);
    }

    // Deduplicate
    const unavailableDates = Array.from(new Set(bookedDays));

    return NextResponse.json({ unavailableDates });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
