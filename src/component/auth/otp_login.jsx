import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Link,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { MailOutline, LockOutlined, Refresh } from "@mui/icons-material";
import loginimage from "../../../public/assets/loginimg.webp";
import { sendOtpApi, veryfyOtpApi } from "@/pages/api/user";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const OTPLogin = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
 const { login } = useAuth();

  const sendOtpEmail = async () => {
    try {
      if (!email || !validateEmail(email)) {
        setErrorEmail("Please enter a valid email address");
        return;
      }
      setIsLoading(true);
      setErrorEmail("");
      const response = await sendOtpApi({ email: email });
      enqueueSnackbar(JSON.stringify(response));
      if (response.message !== "Otp Sent Successfully") {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsOtpSent(true);
      setTimer(30);
      setIsEmailSent(true);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("An error occurred while sending OTP");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitOtp = async () => {
    try {
      if (otp === "") {
        setErrorMessage("OTP cannot be empty");
        return;
      }
      const response = await veryfyOtpApi({ email: email, otp: Number(otp) });
      enqueueSnackbar(response.message);
      if (response.message == "Otp veryfied successfully") {
        login(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (isOtpSent && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isOtpSent, timer]);

  const handleEditEmail = () => {
    setIsEmailSent(false);
    setIsOtpSent(false);
    setEmail("");
    setOtp("");
    setErrorEmail("");
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Left side box with Image */}
        <Grid item xs={12} sm={6}>
          <Image src={loginimage} alt="Login Image" layout="responsive" />
        </Grid>

        {/* Right side box with Login Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
            <CardContent sx={{ padding: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
              >
                Login
              </Typography>

              {/* Step 1: Email Input */}
              {!isEmailSent && (
                <Box component="form" onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    label="Enter Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errorEmail)}
                    helperText={errorEmail}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendOtpEmail}
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      height: 45,
                      fontSize: "16px",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Send OTP"}
                  </Button>
                </Box>
              )}

              {/* Step 2: OTP Input */}
              {isEmailSent && isOtpSent && (
                <Box component="form" onSubmit={(e) => e.preventDefault()}>
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {email}
                    </Typography>
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={handleEditEmail}
                      sx={{ mt: 1 }}
                    >
                      Edit Email
                    </Button>
                  </Box>
                  <TextField
                    label="Enter OTP"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    error={Boolean(errorMessage)}
                    helperText={errorMessage}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitOtp}
                      disabled={isLoading}
                      sx={{
                        height: 45,
                        fontSize: "16px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Submit OTP"
                      )}
                    </Button>
                    {isOtpSent && timer > 0 && (
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Resend in {timer} seconds
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}

              {/* Resend OTP button */}
              {isOtpSent && !isLoading && timer <= 0 && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={sendOtpEmail}
                    startIcon={<Refresh />}
                  >
                    Resend OTP
                  </Button>
                </Box>
              )}

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  Don't have an account?{" "}
                  <Link href="/register" sx={{ textDecoration: "none" }}>
                    Register here
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OTPLogin;
