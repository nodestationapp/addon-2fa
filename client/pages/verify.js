import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ColorModeDropdown } from "@nstation/design-system";

import OtpInput from "../components/SetupModal/OtpInput.js";

import { api } from "@nstation/design-system/utils";
import { useAuth } from "@nstation/auth/client/contexts/authMiddleware.js";

const VerifyContent = () => {
  const navigate = useNavigate();
  const { getUserData } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    (async () => {
      try {
        await api.post(`/admin-api/auth/2fa/jwtVerify`, {
          id,
        });

        setLoading(false);
      } catch (err) {
        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await api.post(`/admin-api/auth/2fa/verify`, {
        id,
        token: values?.token,
      });

      setCookie("access_token", data?.access_token, { maxAge: 1707109200 });
      await getUserData(data?.access_token);
      navigate("/");
    } catch (err) {
      setErrors({ token: err?.response?.data?.error });
      setSubmitting(false);
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    onSubmit,
  });

  if (!!loading) return null;

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
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Logo /> */}
          <Typography
            component="h1"
            variant="h4"
            textAlign="center"
            sx={{ width: "100%", fontSize: 20, mb: 1 }}
          >
            Please enter 2FA code
          </Typography>
          <Typography
            variant="body"
            textAlign="center"
            sx={{ width: "100%", fontSize: 14 }}
          >
            2-Factor Authentication is enabled for your account. Please enter a
            code to log in.
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
          }}
        >
          <OtpInput
            value={formik.values.token}
            onChange={(value) => formik.setFieldValue("token", value)}
            error={formik.errors.token}
            loading={formik.isSubmitting}
          />
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 4 }}
            disabled={formik.values.token.length !== 6}
            loading={formik.isSubmitting}
          >
            Verify
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", top: 15, right: 15 }}>
        <ColorModeDropdown />
      </Box>
    </Box>
  );
};

export default VerifyContent;
