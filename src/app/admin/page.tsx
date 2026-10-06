import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getSubjects } from "@/lib/store";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const subjects = await getSubjects();

  return <AdminDashboard subjects={subjects} />;
}
