"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



const Page = () => {

   const[count,setCount] = useState(5);

    const increment = () => {
        setCount((pre) => (pre<10 ? pre + 1 : pre));
    }

    const decrement = () => {
        setCount((pre) => (pre>0 ? pre - 1 : pre));
    }

    const reset = () =>{
        setCount(5);
    }

    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const key = localStorage.getItem("key");
    
    //     if (!token || !key) {
    //         router.push("/login");
    //       }
    //     }, [router]);
      

    // useEffect(() => {
    //     const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    
    //     if (!token) {
    //       router.push("/login");
    //     }
    //   }, [router]);

    // router.push("/login"); 

      const handleLogout = () => {
        // localStorage.removeItem("token");
        // localStorage.removeItem("key"); 
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login"); 
      }

    return (
     
        <div style={containerStyle}>
            
            <Link href="/home">
                <button style={buttonStyles}>Home</button>
            </Link>

            <Link href="/todo">
                <button style={buttonStyles}>Todo</button>
            </Link>

            <Link href="/login">
                <button style={buttonStyle}>Login</button>
            </Link>

            
            <button type="submit" onClick={handleLogout} style={buttonStyle}>Logout</button>
            
            <div style={hStyle}>
                
            </div>
            <div style={counterStyle}>
            <box>
            <Typography variant="h1" style={{textAlign:"center", justifyContent:"center", marginTop: "150px"}}>{count}</Typography>
            <Button variant="outlined" onClick={increment}>Inc</Button>
            <Button variant="outlined" onClick={decrement}>Dec</Button>
            <Button variant="outlined" onClick={reset}>Res</Button>
            </box>
            </div>
          
        </div>
      
        
    );
}

const hStyle = {
 display: "flex",
 alignItem: "center",
 justifyContent: "center",
}

const counterStyle = {
 display: "flex",
 alignItem: "center",
 justifyContent: "center",
 cursor: "pointer",

}

const buttonStyle = {
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    margin: "10px", 
}

const buttonStyles = {
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    margin: "12px",
    float : "right", 
}


const containerStyle = {
    display: "inline",
    height: "100vh", 
}

export default Page;
