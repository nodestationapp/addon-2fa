import SetupConfirmModal from "./confirm.js";

const DisableModal = ({ open, onClose }) => {
  return (
    <SetupConfirmModal
      open={open}
      onClose={onClose}
      onCloseAll={onClose}
      title="Disable 2-Factor Authentication"
      description="Enter the 6-digit code from your authenticator app."
      buttonText="Disable 2-Factor Authentication"
    />
  );
};

export default DisableModal;
