import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accept";
import Washing from "./washing";
import { useTheme } from "@material-ui/core/styles";
import Request from "./request";
import Http from "../../utils/http";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Container
} from "@mui/material";

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
  useEffect(() => {
    Http.get("/api/order/bystatus/requested")
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
    Http.get("/api/order/bystatus/washed")
      .then((data) => {
        setWashedOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
       <Container>
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
            <Tab label="Completed " value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Request
            flag={flag}
            setFlag={setFlag}
            data={requestedOrders}
            setData={setRequestedOrders}
            auth={auth}
          />
        </TabPanel>
        <TabPanel value="2">
          <Accept
            data={acceptedOrders}
            setData={setAcceptedOrders}
            flag={flag}
            setFlag={setFlag}
            auth={auth}
          />
        </TabPanel>
        <TabPanel value="3">
          <Washing data={washedOrders} setData={setWashedOrders} auth={auth} />
        </TabPanel>
      </TabContext>
      </Container>
    </Box>
  );
}
