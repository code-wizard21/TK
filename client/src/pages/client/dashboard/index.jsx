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
import { toast } from "react-toastify";
import {
  Container,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useSelector } from "react-redux";

import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Http from "../../../utils/http";

export default function DrawerAnchor() {
  const [trackCode, setTrackCode] = useState("");
  const [description, setDescription] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [date, setDate] = useState(dayjs());
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const validate = () => {
    console.log("eeee");
    if (!trackCode && !description) {
      setShowErrors(true);
    } else {
      setShowErrors(false);

      Http.post("/api/cus/register", {
        name: auth.user.name,
        cardNum: trackCode,
        detail: description,
        date: date,
      })
        .then((data) => {
          if (data.data) {
            getList();

            // toggleDrawer('right', false)
            toast.success(" Request is successfully submitted.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    console.log("anchor", anchor, open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [value, setValue] = useState("1");
  const [cusData, setCusData] = useState([]);
  const [cusAccept, setCusAccept] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getList();
  }, []);
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
        setCusAccept(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const list = (anchor) => (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: "#F3F6F9", // Add a light, modern background color
        borderRadius: "15px", // Round the corners for a modern look,
        width: "100%",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          style={{
            color: "#3f51b5",
            fontWeight: 600,
            margin: "20px 0",
            textTransform: "uppercase",
          }}
        >
          Request Wash
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              error={!trackCode && showErrors}
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              id="outlined-basic"
              name="carcode"
              label="Truck Number"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="tell"
              label="Input the Description"
              multiline
              id="standard-basic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={5}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="Date">
                <DateCalendar
                  value={date}
                  onChange={(newValue) => setDate(dayjs(newValue))}
                />
              </DemoItem>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={validate}
          style={{
            backgroundColor: "#FF7F50",
            color: "white",
            textTransform: "uppercase",
            padding: "10px 20px",
            fontSize: "0.875rem",
            boxShadow: "0px 3px 5px 2px rgba(63,81,181, .3)",
            marginBottom: "10px",
          }}
        >
          Request
        </Button>
      </Container>
    </Box>
  );

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
            onClick={toggleDrawer("right", true)}
            style={{
              backgroundColor: "#191923", // Deep, rich color for button background
              color: "#FFFFFF", // White color for button text offers good contrast
              textTransform: "uppercase", // uppercase looks cleaner and more contemporary
              padding: "10px 20px", // slightly larger padding to make the button more prominent
              fontSize: "1rem", // slightly larger text for better readability
              boxShadow: "0px 3px 5px 2px rgba(25,25,35, .3)", // add subtle shadow to give the button a bit of depth
              marginLeft: "auto", // move button to the right
            }}
          >
            Add Request
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
              allowScrollButtonsMobile
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTab-root": {
                  fontSize: "1rem",
                  minWidth: 0,
                  padding: "10px 20px",
                  fontWeight: "600",
                  color: "#191923", // Adjusting the text color to a dark shade for contrast
                },
                "& .Mui-selected": {
                  // Styling the selected tab
                  color: "#007BFF", // Changing the selected tab text color to a modern blue shade
                  backgroundColor: "#E1E5EA", // Setting the selected tab's background color slightly darker than the tab strip background for distinction
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

        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </Container>
    </Box>
  );
}
