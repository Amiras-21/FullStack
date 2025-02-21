"use client";

import { useState } from "react";
import { useAddUserMutation } from "@/app/store/authApi";
import DashboardLayout from "../layout/page";

export default function AddUserForm({ onUserAdded }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [add, { isLoading, isError, error, isSuccess }] = useAddUserMutation();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await add({ firstName, email, password }).unwrap();
      alert(response.message || "User signed up successfully!");

      // Clear form after submission
      setFirstName("");
      setEmail("");
      setPassword("");

      if (onUserAdded) {
        onUserAdded();
      }
    } catch (err) {
      console.error("Failed to add user:", err);
      alert(err?.data?.message || "Failed to add user.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add New User</h2>

          {/* First Name Field */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
