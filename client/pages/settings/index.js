import { useState } from "react";
import Button from "@mui/material/Button";

import SetupModal from "../../components/SetupModal/index.js";
import { Card, CardContent, Stack, Typography } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useTwoFactorAuthMiddleware } from "../../contexts/TwoFactorAuthMiddleware.js";

const Settings = () => {
  const { hasTwoFactorAuth } = useTwoFactorAuthMiddleware();

  const [setupModalOpen, setSetupModalOpen] = useState(false);

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {hasTwoFactorAuth ? (
                <CheckCircleIcon sx={{ color: "success.light" }} />
              ) : (
                <CancelIcon sx={{ color: "error.light" }} />
              )}
              2FA is {hasTwoFactorAuth ? "enabled" : "disabled"}
            </Typography>
            {hasTwoFactorAuth && (
              <Button
                color="primary"
                variant="text"
                onClick={() => setSetupModalOpen(true)}
              >
                Disable
              </Button>
            )}
          </Stack>
          {!hasTwoFactorAuth && (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => setSetupModalOpen(true)}
            >
              Enable 2-Factor Authentication
            </Button>
          )}
        </CardContent>
      </Card>
      <SetupModal
        open={setupModalOpen}
        onClose={() => setSetupModalOpen(false)}
      />
    </>
  );
};

export default Settings;
