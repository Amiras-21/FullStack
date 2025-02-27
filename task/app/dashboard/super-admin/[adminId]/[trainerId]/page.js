"use client";

import { useState,  useEffect } from "react";
import { useParams } from "next/navigation";import DataTable from "@/app/Components/Tables/page";
import DashboardLayout from "@/app/dashboard/layout/page";
import AddButton from "@/app/Components/AddButton/page";
import AddUserModal from "@/app/Components/Modals/AddUserModal/page";

export default function TrainerUsersPage() {
 
  const params = useParams();
  const [trainerId, settrainerId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (params?.trainerId) {
      settrainerId(params.trainerId);
    }
  }, [params]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Users under Trainer {trainerId}</h1>
        <AddButton label="Add User" onClick={() => setModalOpen(true)} />
      </div>
      
      <DataTable />

      {/* <AddUserModal open={modalOpen} onClose={() => setModalOpen(false)} /> */}
      <AddUserModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  trainerId={trainerId} 
  defaultRole="user"
/>

   
    </DashboardLayout>
  );
}
