"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useCreateAdminMutation, useCreateTrainerMutation, useCreateUserMutation, useSendInvitationEmailMutation } from "@/app/store/authApi";

export default function AddUserModal({ open, onClose, adminId, trainerId, defaultRole = "admin" }) {
  const { register, handleSubmit, reset } = useForm();
  const [role, setRole] = useState(defaultRole); 



  const [createAdmin] = useCreateAdminMutation();
  const [createTrainer] = useCreateTrainerMutation();
  const [createUser] = useCreateUserMutation();
  const [sendInvitationEmail] = useSendInvitationEmailMutation()


const onSubmit = async (formData) => {
    try {
      let response;

      if (role === "admin") {
        response = await createAdmin({ ...formData }).unwrap();
      } else if (role === "trainer") {
        if (!adminId) {
          alert("Admin ID is missing.");
          return;
        }
        response = await createTrainer({ ...formData, adminId }).unwrap();
      } else if (role === "user") {
        if (!trainerId) {
          alert("Trainer ID is missing.");
          return;
        }
        response = await createUser({ ...formData, trainerId }).unwrap();
      }

      const emailResponse = await sendInvitationEmail({
        email: formData.email,
        firstName: formData.firstName,
        trainerId,
      }).unwrap();

      if (!emailResponse.success) {
        alert("User added but email failed to send.");
      }
    

      if (response) {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
        reset();
        onClose();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add {role.charAt(0).toUpperCase() + role.slice(1)}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
       
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={defaultRole !== "admin"}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="trainer" disabled={!adminId}>Trainer</MenuItem>
              <MenuItem value="user" disabled={!trainerId}>User</MenuItem>
            </Select>
          </FormControl>

      
          <TextField label="First Name" fullWidth margin="normal" {...register("firstName", { required: true })} />
          <TextField label="Email" fullWidth margin="normal" {...register("email", { required: true })} />
          {/* <TextField label="Password" type="password" fullWidth margin="normal" {...register("password", { required: true })} /> */}

           
          {role === "trainer" && (
            <input type="hidden" value={adminId} {...register("adminId")} />
          )}

         
          {role === "user" && (
            <input type="hidden" value={trainerId} {...register("trainerId")} />
          )}

          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">Add</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
