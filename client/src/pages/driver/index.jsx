import React, { useState, useEffect } from "react";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accept";
import Washing from "./washing";
import Http from "../../utils/http";
import AddIcon from "@mui/icons-material/Add";
import Request from "./request";
import {  Stack, Container } from "@mui/material";
import Button from "@mui/joy/Button";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Drawer from "@mui/joy/Drawer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { RequestTask } from "../../components/requesttask";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [newOrders, setNewOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [washedOrders, setWashedOrders] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getList();
    getAllRequst();
  }, []);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, []);

  const getAllRequst = () => {
    Http.post("/api/order/bystatus/requested", { name: "" })
      .then((data) => {
        setNewOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getList = () => {
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
      <Container maxWidth="lg">
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
            onClick={() => toggleDrawer(true)}
            style={buttonStyle}
            size="small"
          >
            <AddIcon />
          </Button>
        </Stack>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered={isSmallScreen ? false : true} // If not small screen, center the tabs for visual appeal
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
              <Tab label="Completed" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Request data={newOrders} />
          </TabPanel>
          <TabPanel value="2">
            <Accept data={acceptedOrders} />
          </TabPanel>
          <TabPanel value="3">
            <Washing data={washedOrders} />
          </TabPanel>
        </TabContext>
        <Drawer open={open} onClose={() => toggleDrawer(false)} >
          <RequestTask toggleDrawer={toggleDrawer} refreshList={getAllRequst} isDriver />
        </Drawer>
      </Container>
    </Box>
  );
}