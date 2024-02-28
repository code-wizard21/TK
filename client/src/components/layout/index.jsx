import React from "react";
import PropTypes from "prop-types";
import Header from "./Nav";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", 
  },
  content: {
    flexGrow: 1,
    flexShrink: 0, 
    overflow: 'auto', // Helps to ensure content flows correctly
  },
  footer: {
    flexShrink: 0, 
    marginTop: 'auto', // Pushes the footer to the end of content or viewport
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