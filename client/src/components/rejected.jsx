import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
// import axios from "axios";
import Http from "../../src/utils/http";
import { toast } from "react-toastify";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import moment from 'moment';
// ... Your rows data here

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 2,
  },
}));

function CollapsibleRow({ index, props, row, isMobile, setRejected, role }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [openResender, setOpenResender] = useState(false);
  const [rejectid, setRejectID] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const onResend = (id) => {
    setRejectID(id);
    setOpenResender(true);
    reset();
  };
  const onCancel = (id) => {
    Http.post("/api/order/cancel", { id })
      .then((data) => {
        setRejected(data.data);

        toast.success("Successfully cancelled.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setOpenResender(false);
  };
  const handleOk = (data) => {
    setOpenResender(false);
    Http.put("/api/order/bystatus/requested", { id: rejectid, ...data, date })
      .then((data) => {
        setRejected(data.data);

        toast.success(" Request successfully resent.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        {isMobile && (
          <TableCell>
            <IconButton size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell component="th" scope="row">
          <div className="accept">
            <span> {++index}</span>
          </div>
        </TableCell>
        <TableCell component="th" scope="row">
          <div className="accept">
            <span> {row.LeadNumber + "-" + row.PupNumber}</span>
          </div>
        </TableCell>
        {role=='driver' && <TableCell>{row.Company}</TableCell>}
        {!isMobile && (
          <>
            <TableCell>
              <span> {row.Description}</span>
            </TableCell>
            <TableCell>
              <span> {row.Reason}</span>
            </TableCell>
            <TableCell>
              <span> {moment(row.Date).format('YYYY-MM-DD')}</span>
            </TableCell>

            <TableCell>
              {role=='company' && 
              <IconButton
                color="secondary"
                aria-label="Cancel"
                onClick={() => {
                  onCancel(row.id);
                }}
              >
                <ClearIcon />
              </IconButton>
              }
              <IconButton
                color="secondary"
                aria-label="Resend"
                onClick={() => {
                  onResend(row.id);
                }}
              >
                <SettingsBackupRestoreIcon />
              </IconButton>
            </TableCell>
          </>
        )}
      </StyledTableRow>
      {isMobile && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="details">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Description
                      </TableCell>
                      <TableCell align="right">{row.Description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Date
                      </TableCell>
                      <TableCell align="right">{moment(row.Date).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Reject Reason
                      </TableCell>
                      <TableCell align="right">{row.Reason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Action
                      </TableCell>
                      <TableCell align="right">
                        {role=='company' && 
                          <IconButton
                            color="secondary"
                            aria-label="Cancel"
                            onClick={() => {
                              onCancel(row.id);
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        }
                        <IconButton
                          color="secondary"
                          aria-label="add an alarm"
                          onClick={() => {
                            onResend(row.id);
                          }}
                        >
                          <SettingsBackupRestoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      <Dialog
        open={openResender}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Request Again</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Please select new date.</Typography>

          <form onSubmit={handleSubmit(handleOk)} style={{}}>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              render={({ field }) => (
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
              )}
            />

            <Stack
              direction={"row"}
              style={{
                justifyContent: "right",
                gap: "8px",
              }}
            >
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100px" }}
              >
                Request
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default function RejectedList(props) {
  const {role} = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rejected, setRejected] = useState([]);
  useEffect(() => {
    Http.get("/api/order/bystatus/rejected")
      .then((data) => {
        setRejected(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {isMobile && <TableCell />}
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Truck Number</StyledTableCell>
            {role=='driver' && <StyledTableCell>Company</StyledTableCell>}
            {!isMobile && (
              <>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Reason</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rejected.map((row, index) => (
            <CollapsibleRow
              index={index}
              props={props}
              role={role}
              key={row.id}
              row={row}
              setRejected={setRejected}
              isMobile={isMobile}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
