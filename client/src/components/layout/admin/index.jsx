import { useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import NavAdmin from "./nav_admin";
import Main from "../../../pages/admin/main";
import Header from "../header";

// ----------------------------------------------------------------------

export default function AdminLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <NavAdmin openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};
