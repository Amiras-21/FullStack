"use client";

import styles from "../login/login.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";  
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignupMutation } from '../store/authApi';

export default function SignUp() {
  const router = useRouter();
  const [signup, { isLoading, isError, error, isSuccess }] = useSignupMutation();

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
      },
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
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
        firstName: Yup.string()
          .required("First name is required"),
      }),
      onSubmit: async (values) => {
        try {
         
          const response = await signup(values).unwrap();

          if (response.message) {
            alert(response.message);
            router.push('/login');
          } else {
            alert('Sign-up failed');
          }
        } catch (error) {
          console.error(error);
          if (error?.response?.data) {
            console.error("Error details:", error.response.data);
          }
          alert('Error occurred during sign-up');
        }
      },
    });

  return (
    <div className={styles.main}>
      <div className={styles.loginBox}>
        <div className={styles.left}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--login-enter-log-cyber-protection-nallow-pack-people-illustrations-6983270.png?f=webp"
            className={styles.image}
          />
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            {/* First Name Field */}
            <div className={styles.inputBox}>
              <TextField
                required
                id="firstName-input"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div className={styles.inputBox}>
              <TextField
                required
                id="confirm-password-input"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
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
              Sign Up
            </Button>
            <div>
              <p>
                Already have an account? <Link href="/login">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
