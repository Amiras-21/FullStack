"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "../../layout/page";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/app/store/authApi";
import { TextField, Button, CircularProgress } from "@mui/material";

export default function UserDetailsPage() {
    const { userId } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error.data?.error || "Failed to load user details"}</p>;

  const handleEditClick = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      confirmPassword: user.password,
    });
    setPasswordError("");
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    
    try {
      await updateUser({ id: userId, ...formData }).unwrap();
      alert("User updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">User Details</h1>
        <div className="mt-4 p-4 border rounded shadow">
          {isEditing ? (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                label="Email"
                value={user.email}
                fullWidth
                margin="normal"
                disabled // Email cannot be edited
              />
              <div className="flex gap-2 mt-4">
                <Button variant="contained" color="primary" onClick={handleSave}>
                  {isLoading ? <CircularProgress size={24} /> : "Save"}
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Password:</strong> {user.password}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
