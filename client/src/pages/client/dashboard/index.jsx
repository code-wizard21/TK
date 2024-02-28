import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import { Tab } from "@mui/material";
import { Stack } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accept";
import Washing from "./washing";
import Request from "./request";
import { Container } from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Http from "../../../utils/http";
import { RequestTask } from "../../../components/requesttask";

export default function DrawerAnchor() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("1");
  const [cusData, setCusData] = useState([]);
  const [cusAccept, setCusAccept] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getList();
  }, []);
    const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getList = () => {
    Http.post("/api/cus/findAllCustom", { name: auth.user.name })
      .then((data) => {
        setCusData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.post("/api/cus/findAcceptCustom", { name: auth.user.name })
      .then((data) => {
        console.log(data.data);
        setCusAccept(data.data);  
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
      <Container>
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
            <Request data={cusData} setData={setCusData} auth={auth} />
          </TabPanel>
          <TabPanel value="2">
            <Accept data={cusAccept} />
          </TabPanel>
          <TabPanel value="3">
            <Washing />
          </TabPanel>
        </TabContext>

        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          <RequestTask toggleDrawer={toggleDrawer} refreshList={getList} />
        </Drawer>
      </Container>
    </Box>
  );
}