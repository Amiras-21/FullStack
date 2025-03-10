"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  DashboardLayout from "./layout/page"
import DataTable from "@/app/Components/Tables/page";



export default function Dashboard() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const roleFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];

    if (!roleFromCookie) {
      router.push("/login");
    } else {
      setRole(roleFromCookie);
    }
  }, [router]);

  return (
    <DashboardLayout>
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-2 text-gray-600">This is your personalized dashboard.</p>

        <>
          {role === "superadmin" && (
            <div className="mt-5">
             
             
             
            </div>
          )}
        </>
    </div>
    </DashboardLayout>
  );
}
