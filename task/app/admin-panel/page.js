

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddUserForm from "../add-user-form/page";

export default function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
 
    const roleFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];

    if (roleFromCookie) {
      setRole(roleFromCookie);
    } else {
      router.push("/login"); 
    }
  }, [router]);

  const handleAddUserClick = () => {
    setShowAddUserForm(true); 
  };

  const handleUserAdded = () => {
    setShowAddUserForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white transition-all duration-300 p-5`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white mb-5 focus:outline-none"
        >
          <svg
            className={`w-6 h-6 ${isSidebarOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div className="space-y-6">
          {isSidebarOpen && (
            <>
              <div className="text-lg font-semibold">Dashboard</div>
              <nav>
                <ul>
                  <li className="text-gray-300 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                  {role === 'admin' && "Manage User"}
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>

    
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <h1 className="text-2xl font-bold"></h1>

        
        {showAddUserForm && <AddUserForm onUserAdded={handleUserAdded} />}
      </div>

      
      {role === "admin" && (
        <div className="absolute top-5 right-5">
          <button
            onClick={handleAddUserClick}
            className="bg-blue-60
            0 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}
