"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie"; 
import { Button } from "@mui/material";

export default function DashboardLayout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(""); 
  const router = useRouter();
  const pathname = usePathname(); 
  
  const handleLogout = () => {
    Cookies.remove("role");  // Remove user role
    Cookies.remove("token"); // Remove token
    localStorage.removeItem("token"); 
    router.push("/login"); 
  };

  useEffect(() => {
    // Get user role from cookies
    const role = Cookies.get("role"); 
    setUserRole(role);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
     
        <h2 className="text-lg font-bold mb-5">Dashboard</h2>

        {/* Dashboard Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className={`block w-full text-left p-2 rounded-md ${pathname === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          Dashboard
        </button>

        {/* Show Manage Users only if the user is an admin */}
        {userRole === "admin" && (
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block w-full text-left p-2 rounded-md hover:bg-gray-700"
            >
              Manage Users ▾
            </button>

            {isDropdownOpen && (
              <div className="ml-4 mt-2">
                {/* Navigate to Add User */}
                <button
                  onClick={() => router.push("/dashboard/add-user")}
                  className={`block w-full text-left p-2 rounded-md ${pathname === "/dashboard/add-user" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                >
                  Add User
                </button>
                
                {/* Navigate to Get Users */}
                <button
                  onClick={() => router.push("/dashboard/get-user")}
                  className={`block w-full text-left p-2 rounded-md ${pathname === "/dashboard/get-user" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                >
                  Get Users
                </button>
              </div>
            )}
          </div>
        )}
 <Button variant="contained" color="secondary" className="mt-5" onClick={handleLogout}>
          Logout
        </Button>
        
      </div>
      

      {/* Main Content Area (Dynamic) */}
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
}
