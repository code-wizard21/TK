import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { Formik } from "formik";
import useScriptRef from "../../../hooks/useScriptRef";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Http from "../../../utils/http";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";

const Login = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [token, setToken] = useState("");
  const googleHandler = async () => {
    console.error("Login");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const setTokenFunc = (getToken) => {
    setToken(getToken);
  };
  const navigate = useNavigate();

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          // debugger;
          try {
            setLoading(true);
            Http.post("/api/auth/sigin", {
              Email: values?.email,
              Password: values?.password,
              token,
            })
              .then((data) => {
                // debugger;
                setLoading(false);
                if (data.data.status === 200) {
                  const token = data.data.token;
                  localStorage.setItem("authToken", token);
                  const decodedToken = jwtDecode(token);
                  dispatch({ type: "LOGIN_REQUEST", payload: decodedToken });
                  if (decodedToken.job === "customer") {
                    navigate("/client/dashboard");
                  } else if (decodedToken.job === "washer") {
                    navigate("/washer/checktask");
                  } else if (decodedToken.job === "driver") {
                    navigate("/driver/checktask");
                  } else if (decodedToken.job === "admin") {
                    navigate("/admin");
                  }
                } else {
                  setLoading(false);
                  toast.error(data.data.error, {
                    hideProgressBar: true,
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                setRefreshReCaptcha(!refreshReCaptcha);
              });
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
              margin="normal"
            >
              <InputLabel
                htmlFor="outlined-adornment-email-login"
              >
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
                sx={{
                  borderRadius: "12px", // Set your desired border-radius value here
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
              margin="normal"
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                sx={{
                  borderRadius: "12px", // Set your desired border-radius value here
                }}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <LoadingButton
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                  sx={{ backgroundColor: "rgb(94, 53, 177)", color: "white" }} // Using `sx` for custom styles
                >
                  Sign in
                </LoadingButton>
              </AnimateButton>
            </Box>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}>
              <GoogleReCaptcha
                className="google-recaptcha-custom-class"
                onVerify={setTokenFunc}
                refreshReCaptcha={refreshReCaptcha}
              />
            </GoogleReCaptchaProvider>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
