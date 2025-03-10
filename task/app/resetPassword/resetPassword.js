"use client";

import React, { useState, useEffect } from "react";
import { useResetPasswordMutation } from "@/app/store/authApi";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    setToken(searchParams.get("token")); // Move token extraction inside useEffect
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!token) {
      alert("Invalid or expired token");
      return;
    }

    try {
      const response = await resetPassword({ token, newPassword }).unwrap();

      if (response.success) {
        alert("Password Reset Successfully");
        router.push("/login");
      }
    } catch (error) {
      alert(error.data?.error || "Something went wrong");
    }
  };

  if (!token) return <div>Loading...</div>; // Prevent errors before token is set

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="w-96 bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
