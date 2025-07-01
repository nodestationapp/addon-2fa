import OtpInput from "react-otp-input";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const OtpInputComponent = ({ value, loading, error, onChange }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={6}
        renderSeparator={(index) => index === 2 && <span>-</span>}
        renderInput={(inputProps, index) => {
          const { ref, ...rest } = inputProps;

          return (
            <TextField
              {...rest}
              style={null}
              key={index}
              variant="outlined"
              margin="dense"
              inputRef={ref}
              error={error}
              disabled={loading}
              sx={{
                mx: 0.5,
                "&.MuiTextField-root": {
                  margin: 0,
                  padding: "0 5px",

                  ".MuiOutlinedInput-root": {
                    height: 50,
                    width: 50,

                    ".MuiOutlinedInput-input": {
                      textAlign: "center",
                    },
                  },
                },
              }}
            />
          );
        }}
      />
      {!!error && (
        <Typography variant="caption" color="error.light" mt={1}>
          Invalid code
        </Typography>
      )}
    </Box>
  );
};

export default OtpInputComponent;
