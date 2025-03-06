"use client";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

export default function Sidebar({ menuItems }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("token");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-5">Dashboard</h2>

        {menuItems.length > 0 ? (
        menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className={`block w-full text-left p-2 rounded-md transition ${
              pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </button>
        )) 
      ) : (
          <p className="text-gray-400">No menu items available</p>
        )}
      </div>

      <Button variant="contained" color="secondary" className="mt-auto" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
