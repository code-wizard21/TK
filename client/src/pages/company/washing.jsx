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
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

function createData(cnumber, description, date) {
  return { cnumber, description, date };
}
const rows = [
  createData("3532525", "Wash the car", "2024-10-12"),
  createData("3532525", "Wash the car", "2024-10-12"),
  createData("3532525", "Wash the car", "2024-10-12"),
  createData("3532525", "Wash the car", "2024-10-12"),
];

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

function CollapsibleRow({ row, isMobile }) {
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
            <span> {row.cnumber}</span>
          </div>
        </TableCell>
        <TableCell>{row.description}</TableCell>
        {!isMobile && (
          <>
            <TableCell>
              {/* <div className="date"> */}
              <span> {row.date}</span>
              {/* </div> */}
            </TableCell>
            {/* <TableCell>
              <IconButton color="secondary" aria-label="add an alarm">
                <RestoreFromTrashIcon />
              </IconButton>
            </TableCell> */}
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
                        Date
                      </TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell component="th" scope="row">
                        Action
                      </TableCell>

                      <TableCell align="right">
                        <IconButton color="secondary" aria-label="add an alarm">
                          <RestoreFromTrashIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow> */}
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
export default function ResponsiveCollapsibleTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {isMobile && <TableCell />}
            <StyledTableCell>Truck Number</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            {!isMobile && (
              <>
                <StyledTableCell>Date</StyledTableCell>
                {/* <StyledTableCell>Action</StyledTableCell> */}
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <CollapsibleRow key={index} row={row} isMobile={isMobile} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
