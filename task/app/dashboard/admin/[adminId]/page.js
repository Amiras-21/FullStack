"use client";
import { useState,  useEffect } from "react";
import { useParams } from "next/navigation";
import DataTable from "@/app/Components/Tables/page";
import DashboardLayout from "@/app/dashboard/layout/page";
import AddButton from "@/app/Components/AddButton/page";
import AddUserModal from "@/app/Components/Modals/AddUserModal/page";


export default function AdminTrainersPage() {
  const params = useParams();
  const [adminId, setAdminId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (params?.adminId) {
      setAdminId(params.adminId);
    }
  }, [params]);
  

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trainers under Admin {adminId || "Loading..."}</h1>
        {/* Add Button */}
       
        <AddButton label="Add Trainer" onClick={() => setModalOpen(true)} />
      </div>
   
      <DataTable />

      <AddUserModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        defaultRole="trainer"
        adminId={adminId}
      />
   
    </DashboardLayout>
  );
}
