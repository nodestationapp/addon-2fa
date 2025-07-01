import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContentText from "@mui/material/DialogContentText";

import ArrowForward from "@mui/icons-material/ArrowForward";

import { api } from "@nstation/design-system/utils";
import SetupConfirmModal from "./confirm.js";

const SetupModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [secrets, setSecrets] = useState(null);

  useEffect(() => {
    if (!!!open) return;

    (async () => {
      try {
        const data = await api.get(`/admin-api/auth/2fa/setup`);

        setSecrets(data);
      } catch (err) {
        console.error(err);
      }
    })();
    // eslint-disable-next-line
  }, [open]);

  if (step === 1)
    return (
      <SetupConfirmModal
        open={secrets?.secret?.base32}
        onClose={() => setStep(0)}
        onCloseAll={() => {
          setStep(0);
          onClose();
        }}
      />
    );

  return (
    <>
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
            Turn on 2-Step Verification
          </Typography>
          <DialogContentText
            id="alert-dialog-description"
            textAlign="center"
            mb={2}
          >
            Open authenticator and choose scan barcode.
          </DialogContentText>
          <Box
            sx={(theme) => ({
              mt: 2,
              mb: 5,
              display: "flex",
              justifyContent: "center",
              height: 200,
              width: 200,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              overflow: "hidden",
            })}
          >
            {secrets?.qrCode ? (
              <img
                src={secrets?.qrCode}
                alt="2fa-qr"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )}
          </Box>
          <Button
            fullWidth
            size="large"
            disabled={!secrets?.qrCode}
            variant="contained"
            onClick={() => setStep(1)}
            endIcon={<ArrowForward sx={{ height: 16, width: 16 }} />}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetupModal;
