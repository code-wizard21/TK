import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Http from "../../../utils/http";

function CheckoutPage() {
  const [trackCode, setTrackCode] = useState("");
  const [description, setDescription] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [date, setDate] = useState(dayjs());

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, []);
  const validate = () => {
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
            navigate("/client/dashboard");
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
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" align="center">
          Request Wash
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              error={!trackCode && showErrors}
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              id="standard-basic"
              name="carcode"
              label="Truck Number"
              variant="standard"
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
              minRows={2}
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
        <Box display="flex" justifyContent="right" m={1} p={1}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={validate}>
            Request
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default CheckoutPage;
