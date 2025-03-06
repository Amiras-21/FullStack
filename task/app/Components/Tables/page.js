"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgress, TextField, IconButton } from "@mui/material";
import { useGetAdminsQuery, useGetTrainersQuery, useGetUsersQuery } from "@/app/store/authApi";
import EditButton from "../EditButton/page";
import DeleteButton from "../DeleteButton/page";


export default function DataTable() {
  
  
  const { adminId, trainerId } = useParams();
  const router = useRouter();
  const [rows, setRows] = useState([]);
  // const role = adminId ? (trainerId ? "user" : "trainer") : "admin";
  const role = trainerId ? "user" : adminId ? "trainer" : "admin";

  const [refreshKey, setRefreshKey] = useState(0);
  

  const [search, setSearch] = useState("");
 

  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

 

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id)); 
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (updatedAdmin) => {
    setRows((prev) =>
      prev.map((row) => (row.id === updatedAdmin._id ? { ...row, ...updatedAdmin } : row))
    );
    setRefreshKey((prev) => prev + 1);
  };

  

  // let fetchData, columns;

  // if (trainerId) {
  //   console.log("Fetching Users...");
  //   fetchData = useGetUsersQuery;
  //   columns = [
  //     { field: "firstName", headerName: "User Name", flex: 1 },
  //     { field: "email", headerName: "Email", flex: 1 },
  //     { field: "password", headerName: "Password", flex: 1 }, 
  //     { field: "status", headerName: "Status", flex: 1 }, 
  //   ];
  // } else if (adminId) {
  //   console.log("Fetching Trainers...");
  //   fetchData = useGetTrainersQuery;
  //   columns = [
  //     { field: "firstName", headerName: "Trainer Name", flex: 1 },
  //     { field: "email", headerName: "Email", flex: 1 },
  //     { field: "password", headerName: "Password", flex: 1 }, 
  //     { field: "status", headerName: "Status", flex: 1 }, 
  //   ];
  // } else {
  //   console.log("Fetching Admins...");
  //   fetchData = useGetAdminsQuery;
  //   columns = [
  //     { field: "firstName", headerName: "Admin Name", flex: 1 },
  //     { field: "email", headerName: "Email", flex: 1 },
  //     { field: "password", headerName: "Password", flex: 1 }, 
  //     { field: "status", headerName: "Status", flex: 1 }, 
  //   ];
  // }
  
  const fetchData =
  role === "user" ? useGetUsersQuery :
  role === "trainer" ? useGetTrainersQuery :
  useGetAdminsQuery;

  const columns = [
    { field: "firstName", headerName: role === "user" ? "User Name" : role === "trainer" ? "Trainer Name" : "Admin Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div>
          <EditButton row={params.row} role={role} onEdit={handleEdit} />
          <DeleteButton id={params.row._id} role={role} onDelete={handleDelete} />
        </div>
      ),
    },
  ];
  

  // columns.push({
  //   field: "actions",
  //   headerName: "Actions",
  //   flex: 1,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <div>
  //       <EditButton row={params.row} adminId={adminId} trainerId={trainerId} role={role} onEdit={handleEdit} />
  //       <DeleteButton id={params.row._id} role={role} onDelete={handleDelete} />
  //     </div>
  //   ),
  // });

  const { data, error, isLoading, refetch } = fetchData({
    adminId,
    trainerId,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    search,
  });

  useEffect(() => {
    refetch();
  }, [refreshKey, paginationModel, adminId, trainerId, refetch]);

  useEffect(() => {
    // console.log("Fetched data before updating state:", data);

    if (data) {
      const newData = adminId
        ? trainerId
          ? data?.users?.map((item) => ({ ...item, id: item._id })) || []
          : data?.trainers?.map((item) => ({ ...item, id: item._id })) || []
        : data?.admins?.map((item) => ({ ...item, id: item._id })) || [];
  
      // console.log("Setting Rows Data:", newData);
      setRows(newData);
    }
  }, [data]);
  

  // useEffect(() => {
  //   console.log("API Response:", data);
  //   if (data) {
  //     setRows(
  //       adminId
  //         ? trainerId
  //           ? data?.users?.map((item) => ({ ...item, id: item._id })) || []
  //           : data?.trainers?.map((item) => ({ ...item, id: item._id })) || []
  //         : data?.admins?.map((item) => ({ ...item, id: item._id })) || []
  //     );
  //   }
  // }, [data]);

  // useEffect(() => {
  //   refetch();
  // }, [paginationModel, adminId, trainerId, refetch]);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error fetching data.</p>;


  const handleRowClick = (params) => {
    if (!adminId) {
      router.push(`/dashboard/super-admin/${params.row._id}`);
    } else if (!trainerId) {
      router.push(`/dashboard/super-admin/${adminId}/${params.row._id}`);
    }
  };

  

 

  return (
    <div style={{ width: "100%" }}>
      <h1 className="text-xl font-bold mb-3">
        {/* {adminId ? (trainerId ? "Users" : "Trainers") : "Admins"} Table */}
        {trainerId ? "Users" : adminId ? "Trainers" : "Admins"} Table
      </h1>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    

      <DataGrid
       rows={data?.results?.map((item) => ({ ...item, id: item._id })) || []}
      // rows={data?.results || []} 
        
  //       const rows = {data
  // ? adminId
  //   ? trainerId
  //     ? data?.users?.map((item) => ({ ...item, id: item._id })) || []
  //     : data?.trainers?.map((item) => ({ ...item, id: item._id })) || []
  //   : data?.admins?.map((item) => ({ ...item, id: item._id })) || []
  // : []}

        columns={columns}
        paginationMode="server"
        paginationModel={paginationModel}
        rowCount={data?.pagination?.total_data || 0}
        pageSizeOptions={[5, 10, 20]}
        onPaginationModelChange={setPaginationModel}
        onRowClick={handleRowClick} 
        disableSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
     
    </div>
  );
}
