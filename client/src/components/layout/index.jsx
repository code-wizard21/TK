import React from "react";
import PropTypes from "prop-types";
import Header from "./Nav";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
// Custom hook for styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    flexShrink: 0, // Prevents shrinking of content div
  },
  footer: {
    flexShrink: 0, // Prevents shrinking of footer div
    // Rest of footer styles
  },
}));
const PageLayout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <Outlet />
      </main>
      <Footer className={classes.footer} />
    </div>
  );
};
PageLayout.propTypes = {
  children: PropTypes.node,
};
PageLayout.defaultProps = {
  children: null,
};
export default PageLayout;
