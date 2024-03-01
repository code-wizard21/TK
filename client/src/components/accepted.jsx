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
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Http from "../utils/http";
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

function CollapsibleRow({ row, isMobile, index, role, setFlag, flag, props }) {
  const [open, setOpen] = useState(false);
  const onWashed = (id) => {
    Http.post("/api/order/wash", { id })
      .then((data) => {
        props.setFlag(!props.flag);
        props.setData(data.data);
      })
      .catch((err) => {});
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
            {(role=='driver' || role=='washer') && <TableCell>{row.Company}</TableCell>}
            <TableCell>{row.Description}</TableCell>
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
              {/* <div className="date"> */}
              <span> {moment(row.Date).format('YYYY-MM-DD')}</span>
              {/* </div> */}
            </TableCell>
            {
                role=='washer' && 
                    <TableCell>
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                            onClick={() => onWashed(row.id)}
                        >
                            <CheckIcon />
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
                    {role=='company' &&
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Date
                      </TableCell>
                      <TableCell align="right">{moment(row.Date).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>}
                    {(role=='driver' || role=='washer') &&
                    <>
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
                    </>
                    }
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
                    {
                        role=='driver' && 
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Date
                                </TableCell>
                                <TableCell align="right">{moment(row.Date).format('YYYY-MM-DD')}</TableCell>
                            </TableRow>
                    }
                    {
                        role=='washer' &&
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Action
                                </TableCell>

                                <TableCell align="right">
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => onWashed(row.id)}>
                                        <CheckIcon />
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
    </>
  );
}
export default function AcceptedList(props) {
  const theme = useTheme();
  const { role } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                {(role=='driver' || role=='washer') && <StyledTableCell>Company</StyledTableCell>}
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
          {props.data.map((row, index) => (
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
