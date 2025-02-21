"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/app/store/authApi";
import { useForm } from "react-hook-form";
import {
  CircularProgress,
  Button,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DashboardLayout from "../layout/page";

export default function GetUsers() {
  // const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [search, setSearch] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const {
    data: usersData,
    error,
    isLoading,
    refetch,
  } = useGetUsersQuery({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search
  });

  const [deleteUser] = useDeleteUserMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateUser] = useUpdateUserMutation();
  const [editUser, setEditUser] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    refetch();
  }, [paginationModel, statusFilter, refetch]);
  

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className={
            params.row.status === "active"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {params.row.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    // { field: "signUpMethod", headerName: "SignUp Method", flex: 1 },
    {
      field: "signupMethod",
      headerName: "SignUp Method",
      flex: 1,
      renderCell: (params) => {
        console.log("Cell Data:", params.row.signupMethod); // Debugging log
        return <span>{params.row.signupMethod || "No Data"}</span>;
      }
    },
    
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="space-x-2">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleOpenDeleteDialog(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // const rows =
  // usersData?.users?.map((user) => ({
  //     id: user._id,
  //     firstName: user.firstName,
  //     email: user.email,
  //     password: user.password,
  //     status: user.status,
  //     signUpMethod: user.signupMethod,
  //   })) || [];

  const handleEdit = (user) => {
    setEditUser(user);
    setValue("firstName", user.firstName);
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("status", user.status);
    setOpenEditModal(true);
  };

  const onSubmit = async (data) => {
    try {
      await updateUser({ id: editUser._id, ...data });
      refetch();
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.id);
        setOpenDeleteDialog(false);
        refetch();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  // const filteredRows =
  //   statusFilter === "all"
  //     ? rows
  //     : rows.filter((row) => row.status === statusFilter);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error fetching users.</p>;

  return (
    <DashboardLayout>
      <div style={{ height: 400, width: "100%" }}>
        <h1 className="text-xl font-bold mb-3">User List</h1>

        {/* Status Filter Dropdown */}
        <FormControl sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        {/* <DataGrid
          rows={filteredRows}
          columns={columns} */}
        {/* slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          disableSelectionOnClick
          autoHeight={false}
          disableColumnMenu
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              overflowY: "auto",
              maxHeight: 420,
            },
          }}
        /> */}

        <DataGrid
          rows={
            usersData?.users.map((user) => ({ ...user, id: user._id })) || []
          }
          columns={columns}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={usersData?.pagination?.total_data || 0}
          pageSizeOptions={[5, 10, 20]}
          disableSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{selectedUser?.firstName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg w-96 h-96 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center !mb-4">
            Edit User
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name Field */}
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              {...register("firstName")}
              className="bg-gray-100 rounded-md !mb-4"
            />

            {/* Email Field */}
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              {...register("email")}
              className="bg-gray-100 rounded-md !mb-4"
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password")}
              className="bg-gray-100 rounded-md !mb-4"
            />

            {/* Status Dropdown */}
            <FormControl
              fullWidth
              variant="outlined"
              className="bg-gray-100 rounded-md !mb-4"
            >
              <InputLabel>Status</InputLabel>
              <Select
                {...register("status")}
                defaultValue={editUser?.status}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={() => setOpenEditModal(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}
