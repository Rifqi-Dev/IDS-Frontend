import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Snackbar,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../context/AuthContext";
import { Login } from "../services";
import { useEffect, useState } from "react";

const LoginPage = () => {
  document.title = "Sign in";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { auth } = useAuth();

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    await Login(data)
      .then((r) => {
        setLoading(false);
        localStorage.setItem("token", r.data.token);
        auth.token = r.data.token;
        auth.isAuthenticated = true;
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err.response);
        setErrorMessage(err.response?.data?.message);
        auth.isAuthenticated = false;
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    // console.log(auth);
    if (auth.isAuthenticated) navigate("/");
  }, [auth, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full">
          <CardContent className="p-8">
            <div className="flex flex-col items-center">
              <Avatar className="m-1 bg-secondary">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-1">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: "Email is required" })}
                error={!!errors.Email}
                helperText={errors.Email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mt-6 mb-2"
                disabled={loading}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
