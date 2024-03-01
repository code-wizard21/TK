import * as React from "react";
import { Button, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, useMediaQuery, useTheme } from '@mui/system';

// Import your logo here
import Logo from '../../assets/images/photo.png';
import { useNavigate } from "react-router-dom";

const FullHeightContainer = styled(Container)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '0 24px',
  background: '#e0f1ae',
  // background: 'radial-gradient(circle at center top, #ffffff, #0066ff)',
});

export default function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  }
  return (
    <FullHeightContainer>
      <Box mb={4}>
        <img src={Logo} alt="Truck Wash Service Logo" style={{ width: isMobile?'150px':'300px' }} />
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Your Truck Wash Service Title
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Welcome to our Truck Wash Service. We offer high-quality, efficient wash services for all types of trucks.
        Ensure your fleet remains clean and professional with our specialized wash treatments.
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={goLogin}>
        Login
      </Button>
    </FullHeightContainer>
  );
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage: "url(/static/images/templates/templates-images/devices-light.png)",
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
        height: "100vh"
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h3"
            variant="h3"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Our latest&nbsp;
            <Typography
              component="span"
              variant="h3"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              products
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Explore our cutting-edge dashboard, delivering high-quality
            solutions tailored to your needs. <br />
            Elevate your experience with top-tier features and services.
          </Typography>

          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
