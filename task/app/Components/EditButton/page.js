"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useUpdateAdminMutation , useUpdateTrainerMutation , useUpdateUserMutation} from "@/app/store/authApi";


export default function EditButton({ row ,role,  onEdit }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const [updateAdmin] = useUpdateAdminMutation(); 
  const [updateTrainer] = useUpdateTrainerMutation();
  const [updateUser] = useUpdateUserMutation();
  

  const handleOpen = () => {
    // Pre-fill form with existing values
    setValue("firstName", row.firstName);
    setValue("email", row.email);
    setValue("password", row.password); 
    setValue("status", row.status); 
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

//   const onSubmit = async (formData) => {
//     try {
//       await updateAdmin({ id: row._id, ...formData }).unwrap();
//       alert("User updated successfully!");
//       handleClose();
//     } catch (error) {
//       console.error("Update failed", error);
//       alert("Failed to update user.");
//     }
//   };

const onSubmit = async (formData) => {
    try {
      let response;
      if (role === "admin") {
        response = await updateAdmin({ id: row._id, ...formData }).unwrap();
      } else if (role === "trainer") {
        response = await updateTrainer({ id: row._id, ...formData }).unwrap();
      } else if (role === "user") {
        response = await updateUser({ id: row._id, ...formData }).unwrap();
      }


    const updatedData = response?.admin || response?.trainer || response?.user || response;  
      if (updatedData) {
        onEdit(updatedData); 
        alert("User updated successfully!");
        handleClose(); 
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update user.");
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={(e)=>{e.stopPropagation(); handleOpen();}}>
        <Edit />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit {role.charAt(0).toUpperCase() + role.slice(1)}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Name" fullWidth margin="normal" {...register("firstName")} />
            <TextField label="Email" fullWidth margin="normal" {...register("email")} />
         
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              {...register("password")} 
            />

            <TextField 
              select
              label="Status"
              fullWidth
              margin="normal"
              defaultValue="active"
              {...register("status")}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
