import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Hero from "./Hero";

const defaultTheme = createTheme({});

export default function LandingPage() {

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ bgcolor: "background.default" }}>
        <Hero></Hero>
      </Box>
    </ThemeProvider>                
  );
}
