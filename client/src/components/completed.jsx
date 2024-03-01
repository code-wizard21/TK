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

function CollapsibleRow({ index, row, isMobile, role }) {
  const [open, setOpen] = useState(false);
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
        {/* <TableCell>{row.CustomerName}</TableCell> */}
        {!isMobile && (
          <>
            {(role=='driver' || role=='washer') && <TableCell>{row.Company}</TableCell>}
            <TableCell>
              <span> {row.Description}</span>
            </TableCell>
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
              <span> {row.Date}</span>
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
                        Company Name
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
                      <TableCell align="right">{row.Date}</TableCell>
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
export default function CompletedList(props) {
  const theme = useTheme();
  const {role} = props;
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
                {(role=='driver' || role=='washer') && <StyledTableCell>Company Name</StyledTableCell>}
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Pickup</StyledTableCell>
                <StyledTableCell>Drop</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <CollapsibleRow
              index={index}
              key={row.id}
              row={row}
              role={role}
              isMobile={isMobile}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
