import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(setUser);
    localStorage.removeItem("user");
    if (setUser) {
      setUser(null);
    }
  }, [setUser]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    localStorage.setItem("user", values.email);
    setUser(values.email);
    toast.success("Successfully logged in!");
    navigate("/home");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Typography sx={{ textAlign: "center", marginBottom: 10 }} variant="h2">
          Login
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ marginTop: 2 }}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <StyledButtonContainer>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </StyledButtonContainer>
      </form>
    </Container>
  );
};

const StyledButtonContainer = styled(Box)`
  margin-top: 2vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default Login;
