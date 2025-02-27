"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  DashboardLayout from "../layout/page"
import DataTable from "@/app/Components/Tables/page";
import AddButton from "@/app/Components/AddButton/page";
import AddUserModal from "@/app/Components/Modals/AddUserModal/page";



export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <AddButton label="Add Admin" path="#" onClick={() => setIsModalOpen(true)} />  
        </div>
   
        
         
            <div className="mt-5">
             
             <DataTable /> 
             
            </div>
            <AddUserModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
       
    </div>
    </DashboardLayout>
  );
}
