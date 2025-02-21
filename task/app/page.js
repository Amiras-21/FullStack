"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";



const Landingpage = () => {

  const router = useRouter();

  return (
    
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        
    <h1>Welcome to Our Website</h1>
    <p>Click below to login</p>
    <Button variant="contained" color="primary" onClick={() => router.push("/login")}>
      Login
    </Button>
  </div>
  )

}

export default Landingpage;