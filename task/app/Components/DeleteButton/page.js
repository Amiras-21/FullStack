"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IconButton, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDeleteAdminMutation,  useDeleteTrainerMutation , useDeleteUserMutation} from "@/app/store/authApi";

export default function DeleteButton({ id, onDelete , role }) {
  const [open, setOpen] = useState(false);
  const { handleSubmit } = useForm();

  const [deleteAdmin] = useDeleteAdminMutation();
  const [deleteTrainer] = useDeleteTrainerMutation();
  const[deleteUser] = useDeleteUserMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//   const onSubmit = async () => {
//     try {
//       await deleteAdmin(id).unwrap();
//       onDelete(id); // Remove from UI
//       alert("User deleted successfully!");
//       handleClose();
//     } catch (error) {
//       console.error("Delete failed", error);
//       alert("Failed to delete user.");
//     }
//   };

const onSubmit = async () => {
    try {
      if (role === "admin") {
        await deleteAdmin(id).unwrap();
      } else if (role === "trainer") {
        await deleteTrainer(id).unwrap();
      } else if (role === "user") {
        await deleteUser(id).unwrap();
      }


      onDelete(id);
      alert("User deleted successfully!");
      handleClose();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <>
      <IconButton color="error" onClick={(e)=>{e.stopPropagation(); handleOpen();}}>
        <Delete />
      </IconButton> 

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this {role}?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
