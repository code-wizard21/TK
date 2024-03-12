import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../../pages/admin/main";
import Header from "../header";
import { Box, Container } from "@mui/system";
import NavDefault from "./nav_default";
import { Grid } from "@mui/material";
import AppWidgetSummary from "../../currentstate";
import moment from "moment";
import Http from "../../../utils/http";
import { STATUS_ACCEPTED, STATUS_COMPLETED, STATUS_REQUESTED, STATUS_WASHED } from "../../../store/constant";
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

const WasherLayout = () => {
  const [openNav, setOpenNav] = useState(false);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [washedOrders, setWashedOrders] = useState([]);
  const getOrders = () => {
    Http.post("/api/order/bystatus/" + STATUS_ACCEPTED)
      .then((data) => {
        console.log(data);
        setAcceptedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.post(`/api/order/bystatus/${STATUS_WASHED},${STATUS_COMPLETED}`)
      .then((data) => {
        setWashedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
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
            <Container maxWidth="xl" style={{ marginBottom: "20px" }}>
              <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item xs={6} sm={6} md={3}>
                  <AppWidgetSummary
                    title="Washed Today"
                    total={`${
                      washedOrders.filter(
                        (i) =>
                          moment(i.Date).format("YYYY-MM-DD") ==
                          moment().format("YYYY-MM-DD")
                      ).length
                    }`}
                    color="success"
                    icon={
                      <img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />
                    }
                  />
                </Grid>
                <Grid item Grid xs={6} sm={6} md={3}>
                  <AppWidgetSummary
                    title="Pending Today"
                    total={`${
                      acceptedOrders.filter(
                        (i) =>
                          moment(i.Date).format("YYYY-MM-DD") ==
                          moment().format("YYYY-MM-DD")
                      ).length
                    }`}
                    color="info"
                    icon={
                      <img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />
                    }
                  />
                </Grid>
              </Grid>
            </Container>
            <Outlet />
        </Main>
      </Box>
    </>
  );
};

WasherLayout.propTypes = {
  children: PropTypes.node,
};

WasherLayout.defaultProps = {
  children: null,
};

export default WasherLayout;
