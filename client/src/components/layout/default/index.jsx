import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../../pages/admin/main";
import Header from "../header";
import { Box } from "@mui/system";
import NavDefault from "./nav_default";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    flexShrink: 0,
    overflow: "auto", // Helps to ensure content flows correctly
  },
  footer: {
    flexShrink: 0,
    marginTop: "auto", // Pushes the footer to the end of content or viewport
  },
}));

const PageLayout = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth.user);
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
        <NavDefault openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>
            <Outlet />
        </Main>
      </Box>
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

PageLayout.defaultProps = {
  children: null,
};

export default PageLayout;
