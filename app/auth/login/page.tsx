"use client";

import { RootState } from "@/store";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/api/firebase";
import { setIsLoading } from "@/store/slices/users";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading } = useSelector((state: RootState) => state.users);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      dispatch(setIsLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form?.email,
        form?.password
      );

      const token = await userCredential.user.getIdToken();

      await fetch(`/api/auth`, {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/home");
    } catch (error) {
      setError("Invalid Credential");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const isValidForm = !form?.email || !form?.password;
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
          {error && (
            <Typography color="error" textAlign={"center"}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
            disabled={isLoading || isValidForm}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
