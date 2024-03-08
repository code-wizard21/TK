import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from 'moment';
import OrderTableHead from "../pages/table/order/order-table-head";
import { applyFilter, emptyRows, getComparator } from "../pages/table/utils";
import Http from "../utils/http";
import TableNoData from "../pages/table/order/table-no-data";
import TableEmptyRows from "../pages/table/order/table-empty-rows";
import OrderTableRow from "../pages/table/order/order-table-row";

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
              <span> {moment(row.Date).format('YYYY-MM-DD')}</span>
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
  const [rejected, setRejected] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("Name");
  const [filterName, setFilterName] = useState("");

  const [updateId, setUpdateId] = useState("");

  const [updateflag, setUpdateFlag] = useState(false);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rejected.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: props.data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <OrderTableHead
          order={order}
          orderBy={orderBy}
          rowCount={rejected.length}
          numSelected={selected.length}
          onRequestSort={handleSort}
          onSelectAllClick={handleSelectAllClick}
          headLabel={[
            { id: "LeadNumber", label: "Lead" },
            { id: "PupNumber", label: "Pup" },
            { id: "Company", label: "Company" },
            { id: "Description", label: "Description" },
            { id: "Pickup", label: "Pickup" },
            { id: "Drop", label: "Drop" },
            { id: "Date", label: "Date" },
            { id: "" },
          ]}
        />
        <TableBody>
          {dataFiltered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <OrderTableRow
                key={row.id}
                id={row.id}
                lead={row.LeadNumber}
                pup={row.PupNumber}
                company={row.Company}
                description={row.Description}
                date={row.Date}
                getOrders={props.getOrders}
                setUpdateFlag={setUpdateFlag}
                setUpdateId={setUpdateId}
                setRejected={setRejected}
                isMobile={isMobile}
                role={role}
                tab={'washed'}
                selected={selected.indexOf(row.id) !== -1}
                handleClick={(event) => handleClick(event, row.id)}
              />
            ))}

          <TableEmptyRows
            height={77}
            emptyRows={emptyRows(page, rowsPerPage, rejected.length)}
          />

          {notFound && <TableNoData query={filterName} />}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      page={page}
      component="div"
      count={props.data.length}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[5, 10, 25]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}
