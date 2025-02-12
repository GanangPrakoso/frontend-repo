"use client";

import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        p: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form?.email}
            onChange={changeHandler}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={form?.password}
            onChange={changeHandler}
            margin="normal"
          />
          {/* {error && <Typography color="error">{error}</Typography>} */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            //   onClick={handleLogin}
            //   disabled={loading}
          >
            {/* {loading ? "Logging in..." : "Login"} */}
            Login
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
