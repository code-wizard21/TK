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
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
// import axios from "axios";
import Http from "../../utils/http";
import { toast } from "react-toastify";
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

function CollapsibleRow({ index, props, row, isMobile }) {
  const [open, setOpen] = useState(false);
  const onRejected = (data) => {
    console.log(data);
    Http.post("/api/cus/rejetedItemCustom", { id: data })
      .then((data) => {
        props.setData(data.data);
        props.setFlag(true);
        toast.success(" Request successfully Rejected.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onAccepted = (data) => {
    Http.post("/api/cus/acceptedItemCustom", {
      name: props.auth.user.name,
      carnumber: data,
    })
      .then((data) => {
        toast.success(" Request successfully submitted.", {
          hideProgressBar: true,
        });
        props.setData(data.data);
        props.setFlag(true);
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
            <span> {row.CarNumber}</span>
          </div>
        </TableCell>
        <TableCell>{row.CustomerName}</TableCell>
        {!isMobile && (
          <>
            <TableCell>
              <span> {row.Detail}</span>
            </TableCell>
            <TableCell>
              <span> {row.Date}</span>
            </TableCell>

            <TableCell>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => onAccepted(row.CarNumber)}
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
                      <TableCell align="right">{row.Detail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Date
                      </TableCell>
                      <TableCell align="right">{row.Date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Action
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          color="secondary"
                          aria-label="add an alarm"
                          onClick={() => onAccepted(row.CarNumber)}
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
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
export default function ResponsiveCollapsibleTable(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {isMobile && <TableCell />}
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Car Number</StyledTableCell>
            <StyledTableCell>Company Name</StyledTableCell>
            {!isMobile && (
              <>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <CollapsibleRow
              index={index}
              props={props}
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
