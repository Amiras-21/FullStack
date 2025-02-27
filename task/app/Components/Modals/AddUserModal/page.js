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
import { useCreateAdminMutation, useCreateTrainerMutation, useCreateUserMutation } from "@/app/store/authApi";

export default function AddUserModal({ open, onClose, adminId, trainerId, defaultRole = "admin" }) {
  const { register, handleSubmit, reset } = useForm();
  const [role, setRole] = useState(defaultRole); // Default role


  // API Mutations
  const [createAdmin] = useCreateAdminMutation();
  const [createTrainer] = useCreateTrainerMutation();
  const [createUser] = useCreateUserMutation();

//   const onSubmit = async (formData) => {
//     try {

//       let response;
//       if (role === "admin") {
//         response = await createAdmin({ ...formData }).unwrap();
//       } else if (role === "trainer") {
//         response = await createTrainer({ ...formData, adminId }).unwrap();
//       } else if (role === "user") {
//         response = await createUser({ ...formData }).unwrap();
//       }

//       if (response) {
//         alert(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
//         reset();
//         onClose();
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to add user.");
//     }
//   };


// const onSubmit = async (formData) => {
//     try {
//       let response;
//       if (role === "admin") {
//         response = await createAdmin({ ...formData }).unwrap();
//       } else if (role === "trainer") {
//         if (!selectedAdminId) {
//           alert("Please select an Admin for this Trainer.");
//           return;
//         }
//         response = await createTrainer({ ...formData, adminId: selectedAdminId }).unwrap();
//       } else if (role === "user") {
//         if (!selectedTrainerId) {
//           alert("Please select a Trainer for this User.");
//           return;
//         }
//         response = await createUser({ ...formData, trainerId: selectedTrainerId }).unwrap();
//       }

//       if (response) {
//         alert(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
//         reset();
//         onClose();
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to add user.");
//     }
//   };

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
          {/* Role Selection */}
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

          {/* User Fields */}
          <TextField label="First Name" fullWidth margin="normal" {...register("firstName", { required: true })} />
          <TextField label="Email" fullWidth margin="normal" {...register("email", { required: true })} />
          <TextField label="Password" type="password" fullWidth margin="normal" {...register("password", { required: true })} />

            {/* Hidden Admin ID */}
          {role === "trainer" && (
            <input type="hidden" value={adminId} {...register("adminId")} />
          )}

          {/* Hidden Trainer ID */}
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
