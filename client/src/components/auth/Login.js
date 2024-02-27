import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import AuthWrapper1 from "./AuthWrapper1";
import AuthCardWrapper from "./AuthCardWrapper";
import AuthLogin from "./auth-forms/AuthLogin";
import logo from "../../assets/images/photo.png";

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
        style={{ background: "rgb(238, 242, 246)" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <img
                      src={logo}
                      alt="logo"
                      sx={{ width: isMobile ? 100 : 150 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            style={{
                              color: "rgb(103, 58, 183)",
                              fontSize: "1.5rem",
                              fontFamily: "Roboto, sans-serif",
                              fontWeight: "700", // Corrected property name to camelCase
                              lineHeight: 1.2,
                            }}
                            gutterBottom
                            variant={matchDownSM ? "h5" : "h6"}
                          >
                            Hi, Welcome
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
