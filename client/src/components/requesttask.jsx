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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Iconify from "./iconify";
import { SERVICE_TYPE_PICKWASH, SERVICE_TYPE_SHUTTLE1WAY, SERVICE_TYPE_SHUTTLE2WAY, SERVICE_TYPE_WASH } from "../store/constant";

export const RequestTask = ({ toggleDrawer, refreshList, isDriver }) => {
  const auth = useSelector((state) => state.auth);
  const [company, setCompany] = useState(auth.user.name);
  const [showErrors, setShowErrors] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [description, setDescription] = useState("");
  const [leadNumber, setLeadNumber] = useState("");
  const [pupNumber, setPupNumber] = useState("");

  const [pickups, setPickups] = useState([]);
  const [drops, setDrops] = useState([]);

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [trucks, setTrucks] = useState([]);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    (async function () {
      if(isDriver) {
        const trucks = await Http.get("/api/truck");
        setTrucks(trucks.data);
      } else {
        const trucks = await Http.get("/api/truck/by/" + encodeURIComponent(company));
        setTrucks(trucks.data);
      }
      const companies = await Http.get("/api/user/byrole/company");
      setCompanies(companies.data);

      const pickup_locations = await Http.get("/api/pickup_location");
      const drop_locations = await Http.get("/api/drop_location");
      setDrops(drop_locations.data);
      setPickups(pickup_locations.data);
    })();
  }, []);

  const validate = () => {
    if (
      (leadNumber == "") |
      // (pupNumber == "") |
      (isDriver ? company == "" : false) |
      dayjs(date).isBefore(dayjs(), "day")
    ) {
      setShowErrors(true);
    } else {
      toggleDrawer(false);
      console.log("data");
      setShowErrors(false);

      Http.post("/api/order", {
        name: isDriver ? company : auth.user.name,
        leadNumber,
        pupNumber,
        description,
        date: dayjs(date).format("YYYY-MM-DD"),
        pickup,
        drop,
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
  const serviceTypes = [SERVICE_TYPE_WASH, SERVICE_TYPE_PICKWASH, SERVICE_TYPE_SHUTTLE1WAY, SERVICE_TYPE_SHUTTLE2WAY];

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
        width: 'min-content'
      }}
      role="presentation"
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          style={{
            // color: "#3f51b5",
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
                  onChange={(e, v) => {
                      setCompany(v);
                      setLeadNumber("");
                      setPupNumber("");
                    }
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!company && showErrors}
                      value={company}
                      id="outlined-basic"
                      name="company"
                      label="Company"
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
          <Grid xs={6} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-leadnumber"
              options={trucks.filter(i => i.Company.trim() == company).map(i => i.LeadNumber)}
              value={leadNumber}
              onChange={(e, v) => {
                setLeadNumber(v);
                const truck = trucks.find(i => i.LeadNumber == v);
                truck && setPupNumber(truck.PupNumber);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!leadNumber && showErrors}
                  value={leadNumber}
                  id="outlined-basic"
                  name="lead"
                  label="Lead"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={6} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-pupnumber"
              options={trucks.filter(i => i.Company.trim() == company).map(i => i.PupNumber)}
              onChange={(e, v) => setPupNumber(v)}
              value={pupNumber}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!pupNumber && showErrors}
                  value={pupNumber}
                  id="outlined-basic"
                  name="pup"
                  label="Pup"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-description"
              options={serviceTypes}
              onChange={(e, v) => setDescription(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={pickup}
                  id="outlined-basic-description"
                  name="description"
                  label="Service Type"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid xs={6} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-pickup"
              options={pickups.map(i => i.Name)}
              onChange={(e, v) => setPickup(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={pickup}
                  id="outlined-basic-pickup"
                  name="pickup"
                  label="Pickup"
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
              options={drops.map(i => i.Name)}
              onChange={(e, v) => setDrop(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={drop}
                  id="outlined-basic-drop"
                  name="drop"
                  label="Drop"
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
          color="inherit"
          startIcon={<Iconify icon="fa:send" />}
          onClick={validate}
          style={{
            color: "white",
            textTransform: "uppercase",
            padding: "10px 20px",
            fontSize: "0.875rem",
            boxShadow: "0px 3px 5px 2px rgba(63,81,181, .3)",
            marginBottom: "10px",
            width: '100%'
          }}
          size="small"
        >
          Send
        </Button>
      </Container>
    </Box>
  );
};
