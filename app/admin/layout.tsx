import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Command Center | Ferd's Luxury",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#0F0D0A",
      color: "var(--color-ivory)",
    }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#0F0D0A",
      }}>
        {children}
      </main>
    </div>
  );
}
