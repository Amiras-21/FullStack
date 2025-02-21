"use client";

import styles from "./login.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../store/authApi";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()

          .min(10, "Password must be at least 10 characters long")
          .matches(/[a-z]/, "Must include at least one lowercase letter")
          .matches(/[A-Z]/, "Must include at least one uppercase letter")
          .matches(/\d/, "Must include at least one number")
          .matches(/[@$!%*?&]/, "Must include at least one special character")
          .required("Password is required"),
      }),
      //   onSubmit : (values) => {
      //     const token = Math.random().toString(36).substring(7);
      //     // const key = Math.random().toString(36).substring(7);

      //     // localStorage.setItem("token", token);
      //     // localStorage.setItem("key", key);

      //     document.cookie = `token=${token}; path=/; Secure;`;

      //     alert("login successfully");
      //     router.push("/home");
      // },

      onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await loginUser(values).unwrap();
          console.log('Response:', response);

          document.cookie = `token=${response.token}; path=/; Secure; SameSite=Strict`;
          document.cookie = `role=${response.role}; path=/; Secure; SameSite=Strict`;

          // const token = Math.random().toString(36).substring(7);
          // document.cookie = `token=${token}; path=/; Secure;`;
          alert(response.message);
          if (response.role && response.role.trim() === "admin"){
            console.log('Redirecting to admin-panel');
            router.push("/dashboard");
          } else {
            console.log('Redirecting to home');
            router.push("/dashboard");
          }

          
        } catch (error) {
          console.error(error);
          alert(error?.data?.message || "An error occurred");
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className={styles.main}>
      <div className={styles.loginBox}>
        <div className={styles.left}>
          <img
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?semt=ais_hybrid"
            className={styles.image}
          />
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className={styles.inputBox}>
              <TextField
                required
                id="email-input"
                label="Email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className={styles.inputBox}>
              <TextField
                required
                id="password-input"
                label="Password"
                variant="outlined"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className={styles.loginButton}
            >
              Login
            </Button>
            <div>
              <p>
                New user? <Link href="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
