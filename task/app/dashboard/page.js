"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import  DashboardLayout from "./layout/page"

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
          {role === "admin" && (
            <div className="mt-5">
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <p className="text-gray-600">Manage users from here.</p>
            </div>
          )}
        </>
    </div>
    </DashboardLayout>
  );
}
