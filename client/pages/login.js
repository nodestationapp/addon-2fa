import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { ColorModeDropdown } from "@nstation/design-system";

import { Logo } from "@nstation/design-system";
import { api } from "@nstation/design-system/utils";
import { useAuth } from "@nstation/auth/client/contexts/authMiddleware.js";

const LoginContent = () => {
  const { getUserData } = useAuth();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await api.post(`/admin-api/auth/login`, {
        email: values?.email,
        password: values?.password,
      });

      if (data?.access_token) {
        setCookie("access_token", data?.access_token, { maxAge: 1707109200 });
        await getUserData(data?.access_token);
        navigate("/");
      } else {
        navigate(`/2fa-verify?id=${data?.id}`);
      }
    } catch (err) {
      setErrors(err?.response?.data?.errors);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 380 }}>
        <Box
          sx={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Logo />
          <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            sx={{ width: "100%", fontSize: 20 }}
          >
            Log in to your account
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            autoComplete="email"
            error={formik.errors.email}
            value={formik.values.email}
            helperText={formik.errors.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            error={formik.errors.password}
            value={formik.values.password}
            autoComplete="current-password"
            helperText={formik.errors.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography
                      component={Link}
                      variant="caption"
                      color="textSecondary"
                      to="/forget-password"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forget password
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={formik.isSubmitting}
            color="primary"
          >
            Sign in
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: 15, right: 15 }}>
        <ColorModeDropdown />
      </Box>
    </Box>
  );
};

export default LoginContent;
