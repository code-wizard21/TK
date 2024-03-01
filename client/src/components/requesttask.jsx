import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import Http from "../utils/http";
import { useSelector } from "react-redux";
import {
  Container,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  Autocomplete,
} from "@mui/material";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

export const RequestTask = ({ toggleDrawer, refreshList, isDriver }) => {
  const auth = useSelector((state) => state.auth);
  const [companyName, setCompanyName] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState("");
  const [trackCode, setTrackCode] = useState("");

  const [picksUp, setPicksUp] = useState([]);
  const [dropDown, setDropDown] = useState([]);

  const [pickOneUp, setPicksOneUp] = useState("");
  const [dropOneDown, setDropOneDown] = useState("");

  const [trucks, setTrucks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const dropOptions = dropDown.map(i => i.DropName);
  useEffect(() => {
    (async function () {
      const trucks = await Http.get("/api/truck");
      setTrucks(trucks.data);
      const companies = await Http.get("/api/user/byrole/company");
      setCompanies(companies.data);

      const pickup_locations = await Http.get("/api/pickup_location");
      const drop_locations = await Http.get("/api/drop_location");
      setDropDown(drop_locations.data);
      setPicksUp(pickup_locations.data);
    })();
  }, []);

  const validate = () => {
    if (
      (trackCode == "") |
      (description == "") |
      (isDriver ? companyName == "" : false) |
      dayjs(date).isBefore(dayjs(), "day")
    ) {
      setShowErrors(true);
    } else {
      toggleDrawer(false);
      console.log("data");
      setShowErrors(false);

      Http.post("/api/order", {
        name: isDriver ? companyName : auth.user.name,
        cardNum: trackCode,
        detail: description,
        date: date,
        pick: pickOneUp,
        drop: dropOneDown,
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
          {isDriver ? (
            <Grid xs={12} sm={12}>
              <Grid xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-company"
                  options={companies.map((i) => i.Name)}
                  onChange={(e, v) => setCompanyName(v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!companyName && showErrors}
                      value={companyName}
                      id="outlined-basic"
                      name="companyname"
                      label="Company Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          <Grid xs={12} sm={12}>
            <Autocomplete
              disablePortal
              id="combo-box-trucknumber"
              options={trucks.map((i) => `${i.FirstNumber}-${i.SecondNumber}`)}
              onChange={(e, v) => setTrackCode(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!trackCode && showErrors}
                  value={trackCode}
                  id="outlined-basic"
                  name="carcode"
                  label="Truck Number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              name="tell"
              label="Input the Description"
              error={!description && showErrors}
              id="standard-basic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={5}
              fullWidth
            />
          </Grid>
          <Grid xs={6} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-pickup"
              options={picksUp.map((i) => `${i.PickName}`)}
              onChange={(e, v) => setPicksOneUp(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!pickOneUp && showErrors}
                  value={pickOneUp}
                  id="outlined-basic-pickup"
                  name="pickup"
                  label="Pickup Location"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={6} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-drop"
              options={dropOptions}
              onChange={(e, v) => setDropOneDown(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!dropOneDown && showErrors}
                  value={dropOneDown}
                  id="outlined-basic-drop"
                  name="drop"
                  label="Dropdown Location"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="">
                <DateCalendar
                  value={date}
                  onChange={(newValue) => setDate(dayjs(newValue))}
                  sx={{ width: "270px" }}
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
          size="small"
        >
          Request
        </Button>
      </Container>
    </Box>
  );
};
