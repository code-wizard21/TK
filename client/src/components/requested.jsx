import React, { useState } from "react";
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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useForm, Controller } from "react-hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Http from "../utils/http";
import { toast } from "react-toastify";
import moment from 'moment';
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

function CollapsibleRow({ props, row, isMobile, index, role }) {
  const [open, setOpen] = useState(false);
  const [openRejecter, setOpenRejecter] = useState(false);
  const [rejectid, setRejectID] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const onRejected = (id) => {
    setRejectID(id);
    setOpenRejecter(true);
    reset();
  };
  const onAccepted = (id) => {
    Http.post("/api/order/accept", { id })
      .then((data) => {
        toast.success(" Request successfully accepted.", {
          hideProgressBar: true,
        });
        props.setData(data.data);
        props.setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setOpenRejecter(false);
  };
  const handleOk = (data) => {
    setOpenRejecter(false);
    Http.post("/api/order/reject", { id: rejectid, ...data })
      .then((data) => {
        props.setData(data.data);
        props.setFlag(true);
        toast.success(" Request successfully rejected.", {
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

        {!isMobile && (
          <>
            {role=='company' && <TableCell>{row.Description}</TableCell>}
            {(role=='driver' || role=='washer') && <>
                <TableCell>{row.Company}</TableCell>
                <TableCell>
                    <span> {row.Description}</span>
                </TableCell>
            </>}
            <TableCell component="th" scope="row">
              <div className="accept">
                <span> {row.Pickup}</span>
              </div>
            </TableCell>
            <TableCell component="th" scope="row">
              <div className="accept">
                <span> {row.Drop}</span>
              </div>
            </TableCell>
            <TableCell>
              <span> {moment(row.Date).format('YYYY-MM-DD')}</span>
            </TableCell>
            {role=='washer' && 
                <TableCell>
                    <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        onClick={() => onAccepted(row.id)}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        onClick={() => {
                        onRejected(row.id);
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </TableCell>
            }
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
                            Company
                        </TableCell>
                        <TableCell align="right">{row.Company}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                        Description
                        </TableCell>
                        <TableCell align="right">{row.Description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Pickup
                      </TableCell>
                      <TableCell align="right">{row.Pickup}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Drop
                      </TableCell>
                      <TableCell align="right">{row.Drop}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Date
                        </TableCell>
                        <TableCell align="right">{moment(row.Date).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                    {role=='washer' &&
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Action
                            </TableCell>

                            <TableCell align="right">
                                <IconButton
                                color="secondary"
                                aria-label="add an alarm"
                                onClick={() => onAccepted(row.id)}
                                >
                                <CheckIcon />
                                </IconButton>
                                <IconButton
                                color="secondary"
                                aria-label="add an alarm"
                                onClick={() => {
                                    onRejected(row.id);
                                }}
                                >
                                <ClearIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    }
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      <Dialog
        open={openRejecter}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Reject</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Please input the reason to reject.
          </Typography>

          <form onSubmit={handleSubmit(handleOk)} style={{}}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.description}
                  helperText={errors.description ? errors.description.message : ""}
                />
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
                Reject
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default function RequestedList(props) {
  const theme = useTheme();
  const {role} = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data } = props;
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {isMobile && <TableCell />}
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Truck Number</StyledTableCell>

            {!isMobile && (
              <>
                {(role=='driver'||role=='washer') && <StyledTableCell>Company</StyledTableCell>}
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Pickup</StyledTableCell>
                <StyledTableCell>Drop</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                {role=='washer' && <StyledTableCell>Action</StyledTableCell>}
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <CollapsibleRow
              index={index}
              props={props}
              role={role}
              key={row.id}
              row={row}
              isMobile={isMobile}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
