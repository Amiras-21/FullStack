

// app/layout.js
"use client";  // If you're using Redux or any client-side state management


import { Provider } from "react-redux";
import { store } from "./store/store"; // Ensure correct path to store
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider store={store}>{children}</Provider>  
      </body>
    </html>
  );
}






