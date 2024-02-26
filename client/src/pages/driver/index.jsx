import React, { useState, useEffect } from "react";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accecpint";
import Washing from "./washing";
import Http from "../../utils/http";
import Request from "./request";
import { Containe, Stack, Container } from "@mui/material";
import Button from "@mui/joy/Button";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Drawer from "@mui/joy/Drawer";
import { useSelector } from "react-redux";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [cusList, setCusList] = useState([]);
  const [cusWashed, setCusWashed] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState("");
  const [trackCode, setTrackCode] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    // if (!auth.isLoggedIn) {
    //   navigate("/");
    // }
  }, []);

  const getList = () => {
    Http.get("/api/driv/getAllAccepted")
      .then((data) => {
        setCusList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/driv/getAllWashed")
      .then((data) => {
        setCusWashed(data.data);
        // setCusList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const list = (anchor) => (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: "#F3F6F9", // Add a light, modern background color
        borderRadius: "15px", // Round the corners for a modern look
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
            toast.success(" Request successfully submitted.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              allowScrollButtonsMobile
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
              <Tab label="Request" value="1" />
              <Tab label="Accepted" value="2" />
              <Tab label="Washed" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Request data={cusList} />
          </TabPanel>
          <TabPanel value="2">
            <Accept data={cusList} />
          </TabPanel>
          <TabPanel value="3">
            <Washing data={cusWashed} />
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
