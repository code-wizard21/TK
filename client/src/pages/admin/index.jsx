import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";


function Admin() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={3}>
          <Sidebar
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            draweropen={open}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Admin;
