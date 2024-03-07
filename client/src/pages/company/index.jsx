import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Tab } from "@mui/material";
import { Stack } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Container } from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Http from "../../utils/http";
import { RequestTask } from "../../components/requesttask";
import AcceptedList from "../../components/accepted";
import RequestedList from "../../components/requested";
import CompletedList from "../../components/completed";
import RejectedList from "../../components/rejected";

export default function DrawerAnchor() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("1");
  const [requestedOrders, setRequestedOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [washedOrders, setWashedOrders] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getOrders();
  }, []);
    const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getOrders = () => {
    Http.get("/api/order/bystatus/requested", { name: auth.user.name })
      .then((data) => {
        setRequestedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/order/bystatus/accepted", { name: auth.user.name })
      .then((data) => {
        setAcceptedOrders(data.data);  
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/order/bystatus/washed", { name: auth.user.name })
      .then((data) => {
        setWashedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const toggleDrawer = (inOpen) => {
    setOpen(inOpen);
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 4, md: 6, lg: 8 },
      }}
    >
      <Container sx={{ paddingLeft: 0, paddingRight: 0}}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          sx={{ width: 1 }} // makes the Stack take the full width of the Container
        >
          <Box flexGrow={1}></Box>

          <Button
            variant="contained"
            onClick={() => toggleDrawer(true)}
            style={buttonStyle}
            sx={{ marginRight: 2}}
            size="small"
          >
            <AddIcon />
          </Button>
        </Stack>

        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "#A9A9A9",
              backgroundColor: "#F3F6F9", // Changing the background color to a modern light shade
            }}
          >
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
              <Tab label="Rejected " value="2" />
              <Tab label="In Progress" value="3" />
              <Tab label="Completed " value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <RequestedList orders={requestedOrders} setData={setRequestedOrders} auth={auth} role={"company"} />
          </TabPanel>
          <TabPanel value="2">
            <RejectedList role={"company"} />
          </TabPanel>
          <TabPanel value="3">
            <AcceptedList data={acceptedOrders} setData={setAcceptedOrders} role={"company"} />
          </TabPanel>
          <TabPanel value="4">
            <CompletedList data={washedOrders} 
              setData={setWashedOrders}
              auth={auth}/>
          </TabPanel>
        </TabContext>

        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          <RequestTask toggleDrawer={toggleDrawer} refreshList={getOrders} />
        </Drawer>
      </Container>
    </Box>
  );
}