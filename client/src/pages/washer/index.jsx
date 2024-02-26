import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accecpint";
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
  const [cusList, setCusList] = useState([]);
  const [cusAccepted, setCusAccepted] = useState([]);
  const [cusWashed, setCusWashed] = useState([]);
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
    Http.get("/api/wash/getAllList")
      .then((data) => {
        setCusList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.post("/api/wash/getAcceptList", { name: auth.user.name })
      .then((data) => {
        setCusAccepted(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/wash/getAllWashed")
      .then((data) => {
        setCusWashed(data.data);
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
            <Tab label="Accepted" value="2" />
            <Tab label="Washed " value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Request
            flag={flag}
            setFlag={setFlag}
            data={cusList}
            setData={setCusList}
            auth={auth}
          />
        </TabPanel>
        <TabPanel value="2">
          <Accept
            data={cusAccepted}
            setData={setCusAccepted}
            cusWashed={cusWashed}
            setCusWashed={setCusWashed}
            flag={flag}
            setFlag={setFlag}
            auth={auth}
          />
        </TabPanel>
        <TabPanel value="3">
          <Washing data={cusWashed} setData={setCusWashed} auth={auth} />
        </TabPanel>
      </TabContext>
      </Container>
    </Box>
  );
}
