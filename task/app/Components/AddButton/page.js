"use client";
import { Button } from "@mui/material";

export default function AddButton({ label, onClick }) {
  return (
    <div className="flex justify-end">
      <Button variant="contained" color="primary" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}
