"use client";

import { useState } from "react";
import styles from "../login/login.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/app/store/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword({ email }).unwrap();
      alert(response.message);
    } catch (error) {
      alert(error.data?.error || "Something went wrong");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.loginBox}>
        <div className={styles.left}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-illustration-download-in-svg-png-gif-file-formats--lock-pin-security-reset-social-media-pack-people-illustrations-6061606.png?f=webp"
            className={styles.image}
            alt="Forgot Password"
          />
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <div className={styles.inputBox}>
              <TextField
                required
                id="email-input"
                label="Enter Your Email"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? "Sending Email..." : "Send Email"}
            </Button>
            <div>
              <p>
                Already Sending Email? <Link href="/login">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
