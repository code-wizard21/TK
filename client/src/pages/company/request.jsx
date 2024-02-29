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
import Http from "../../utils/http";
import { toast } from "react-toastify";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
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

function CollapsibleRow({ props, row, isMobile, index }) {
  const [open, setOpen] = useState(false);
  // const onDelete = (id) => {
  //   Http.delete(`/api/order/${id}`)
  //     .then((data) => {
  //       toast.error(" Request is canceled.",{
  //          hideProgressBar: true,
  //       });
  //       props.setData(data.data);
  //     })
  //     .catch((err) => {});
  // };
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
        <TableCell>{row.Detail}</TableCell>
        {!isMobile && (
          <>
            <TableCell>
              <span> {row.Date}</span>
            </TableCell>
            {/* <TableCell>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => onDelete(row.id)}
              >
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
                      <TableCell align="right">{row.Date}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell component="th" scope="row">
                        Action
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          color="secondary"
                          aria-label="add an alarm"
                          onClick={() => onDelete(row.id)}
                        >
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
export default function ResponsiveCollapsibleTable(props) {
  const theme = useTheme();
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
          {data.map((row, index) => (
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
