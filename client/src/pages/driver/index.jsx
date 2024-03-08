import React, { useState, useEffect } from "react";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Http from "../../utils/http";
import AddIcon from "@mui/icons-material/Add";
import {  Stack, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { RequestTask } from "../../components/requesttask";
import AcceptedList from "../../components/accepted";
import RequestedList from "../../components/requested";
import CompletedList from "../../components/completed";
import RejectedList from "../../components/rejected";
import Iconify from "../../components/iconify";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [newOrders, setNewOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [washedOrders, setWashedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, []);

  const getOrders = () => {
    Http.get("/api/order/bystatus/requested", { name: "" })
      .then((data) => {
        setNewOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/order/bystatus/accepted")
      .then((data) => {
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
    Http.get("/api/order/bystatus/rejected", { name: auth.user.name })
      .then((data) => {
        setRejectedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (inOpen) => {
    setOpen(inOpen);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonStyle = {
    backgroundColor: "#009688",
    color: "#FFFFFF",
    textTransform: "uppercase",
    // Larger padding for a more prominent button
    fontSize: "1rem",
    boxShadow: "5px 5px 15px rgba(0,0,0,0.15)", // Soft shadow for a neumorphic effect
    borderRadius: "50px", // Rounded corners for a softer appeal
    fontWeight: "600", // Bold typography
    letterSpacing: "1px", // Letter spacing for uppercase font
    marginLeft: "auto",
    padding: "5px 10px",
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 4, md: 6, lg: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0}}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          sx={{ width: 1 }} // makes
        >
          <Box flexGrow={1}></Box>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => toggleDrawer(true)}
            sx={{ marginRight: 2}}
          >
            New Request
          </Button>
        </Stack>
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
              <Tab label="Rejected" value="2" />
              <Tab label="In Progress" value="3" />
              <Tab label="Completed" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <RequestedList orders={newOrders} 
              getOrders={getOrders} role={"driver"} />
          </TabPanel>
          <TabPanel value="2">
            <RejectedList orders={rejectedOrders} 
              getOrders={getOrders} role={"driver"} />
          </TabPanel>
          <TabPanel value="3">
            <AcceptedList orders={acceptedOrders} 
              getOrders={getOrders} role={"driver"} />
          </TabPanel>
          <TabPanel value="4">
            <CompletedList orders={washedOrders}
              getOrders={getOrders} role={"driver"} />
          </TabPanel>
        </TabContext>
        <Drawer open={open} onClose={() => toggleDrawer(false)} >
          <RequestTask toggleDrawer={toggleDrawer} refreshList={getOrders} isDriver />
        </Drawer>
      </Container>
    </Box>
  );
}