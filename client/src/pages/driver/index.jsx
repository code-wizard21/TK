import React, { useState, useEffect } from "react";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accecpint";
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

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [reqList, setReqList] = useState([]);
  const [cusList, setCusList] = useState([]);
  const [cusWashed, setCusWashed] = useState([]);
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
    Http.post("/api/cus/findallcustomreq", { name: "" })
      .then((data) => {
        setReqList(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getList = () => {
    Http.get("/api/driv/getAllAccepted")
      .then((data) => {
        setCusList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
              <Tab label="Request" value="1" />
              <Tab label="In Progress" value="2" />
              <Tab label="Completed" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Request data={reqList} />
          </TabPanel>
          <TabPanel value="2">
            <Accept data={cusList} />
          </TabPanel>
          <TabPanel value="3">
            <Washing data={cusWashed} />
          </TabPanel>
        </TabContext>
        <Drawer open={open} onClose={() => toggleDrawer(false)} >
          <RequestTask toggleDrawer={toggleDrawer} refreshList={getAllRequst}/>
        </Drawer>
      </Container>
    </Box>
  );
}

const RequestTask = ({ toggleDrawer ,refreshList}) => {
  const [companyName, setCompanyName] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState("");
  const [trackCode, setTrackCode] = useState("");

  const validate = () => {
    console.log(trackCode, "eee");
    if (
      (trackCode == "") |
      (description == "") |
      (companyName == "") |
      dayjs(date).isBefore(dayjs(), "day")
    ) {
      setShowErrors(true);
    } else {
      toggleDrawer(false);
      console.log("data");
      setShowErrors(false);

      Http.post("/api/cus/register", {
        name: companyName,
        cardNum: trackCode,
        detail: description,
        date: date,
      })
        .then((data) => {
          console.log(data.data);
          if (data.data) {
            toast.success("Request successfully submitted.", {
              hideProgressBar: true,
            });
            refreshList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundColor: "#F3F6F9", // Add a light, modern background color
        borderRadius: "15px", // Round the corners for a modern look
        overflow: "auto", // enable scroll if content overflows
        height: "100vh", // occupy full viewport height
        boxSizing: "border-box", // ensure padding and border are included in element's total height and width
      }}
      role="presentation"
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
            <Grid item xs={12}>
              <TextField
                error={!companyName && showErrors}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                id="outlined-basic"
                name="companyname"
                label="Company Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
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
              error={!description && showErrors}
              id="standard-basic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={5}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="">
                <DateCalendar
                  value={date}
                  onChange={(newValue) => setDate(dayjs(newValue))}
                  sx={{ width: "300px" }}
                />
              </DemoItem>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Button
          variant="contained"
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
};
