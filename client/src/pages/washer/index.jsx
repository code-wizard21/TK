import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Box, Card, CardContent, Grid } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useTheme } from "@material-ui/core/styles";
import Http from "../../utils/http";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Container } from "@mui/material";
import AcceptedList from "../../components/accepted";
import RequestedList from "../../components/requested";
import CompletedList from "../../components/completed";
import moment from "moment";
import AppWidgetSummary from "../../components/currentstate";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [requestedOrders, setRequestedOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [washedOrders, setWashedOrders] = useState([]);
  const [flag, setFlag] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth.isLoggedI, navigate]);
  const theme = useTheme();
  const getOrders = () => {
    Http.get("/api/order/bystatus/requested")
      .then((data) => {
        setRequestedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/order/bystatus/accepted", { name: auth.user.name })
      .then((data) => {
        console.log(data);
        setAcceptedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/order/bystatus/washed")
      .then((data) => {
        setWashedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getOrders();
  }, [flag, auth.user.name]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 4, md: 6, lg: 8 }, // Adjust padding for different screen sizes
        // Add additional styling as needed here
      }}
    >
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
      <Container sx={{ paddingLeft: 0, paddingRight: 0}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered={true} // If not small screen, center the tabs for visual appeal
              sx={{
                backgroundColor: theme.palette.background.paper,
                "& .MuiTab-root": {
                  fontSize: isSmallScreen ? "0.7rem" : "1rem",
                  minWidth: 0,
                  padding: isSmallScreen ? "5px 10px" : "10px 20px",
                  fontWeight: "600",
                  color: "#191923",
                },
              }}
            >
              <Tab label="Requested" value="1" />
              <Tab label="In Progress" value="2" />
              <Tab label="Completed " value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <RequestedList
              orders={requestedOrders}
              getOrders={getOrders}
              role={"washer"}
            />
          </TabPanel>
          <TabPanel value="2">
            <AcceptedList
              orders={acceptedOrders}
              getOrders={getOrders}
              role={"washer"}
            />
          </TabPanel>
          <TabPanel value="3">
            <CompletedList
              orders={washedOrders}
              getOrders={getOrders} role={"washer"}
            />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
}
