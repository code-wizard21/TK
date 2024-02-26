import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are QCTruckwash company, dedicated to providing the best
              service to our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              625 McDonald St Regina, SK S4N 4X1,
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: qctruckwash.ca
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (306) 529.6419
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
