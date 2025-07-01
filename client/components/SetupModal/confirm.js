import { useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContentText from "@mui/material/DialogContentText";

import OtpInput from "./OtpInput.js";
import ArrowForward from "@mui/icons-material/ArrowForward";

import { api } from "@nstation/design-system/utils";

import { useTwoFactorAuthMiddleware } from "../../contexts/TwoFactorAuthMiddleware.js";

const SetupConfirmModal = ({ open, onClose, onCloseAll }) => {
  const theme = useTheme();
  const { refetch } = useTwoFactorAuthMiddleware();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("/admin-api/auth/2fa/setup/verify", {
        secret: open,
        token: otp,
      });

      refetch();
      onCloseAll();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: 520,
          width: "100%",
          ...(fullScreen && {
            borderRadius: 0,
          }),
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" textAlign="center" mt={2}>
          Verify Authentication Code
        </Typography>
        <DialogContentText
          id="alert-dialog-description"
          textAlign="center"
          mb={4}
        >
          Enter the 6-digit code from your authenticator app.
        </DialogContentText>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            loading={loading}
            error={error}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit}
          loading={loading}
          disabled={otp.length !== 6}
          endIcon={<ArrowForward sx={{ height: 16, width: 16 }} />}
        >
          Complete 2-Factor Authentication
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SetupConfirmModal;
