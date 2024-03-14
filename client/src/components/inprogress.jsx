import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  useMediaQuery,
  useTheme,
  TablePagination,
  Typography,
  Button,
} from "@mui/material";
import OrderTableHead from "../pages/table/order/order-table-head";
import TableEmptyRows from "../pages/table/order/table-empty-rows";
import { applyFilter, emptyRows, getComparator } from "../pages/table/utils";
import OrderTableRow from "../pages/table/order/order-table-row";
import TableNoData from "../pages/table/order/table-no-data";
import Http from "../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Container, Stack } from "@mui/system";
import { STATUS_ACCEPTED, STATUS_WASHED } from "../store/constant";
import moment from "moment";
import { fetchInprogress } from "../redux/action";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Iconify from "./iconify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AcceptedList(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("Date");
  const [filterName, setFilterName] = useState("");
  const {inprogress: orders} = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const role = auth.user.job;
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const getOrders = () => fetchInprogress(role, auth.user.name, dateFrom, dateTo)(dispatch);

  useEffect(() => {
    getOrders();
  }, [dateFrom, dateTo]);

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
      const newSelecteds = orders.map((n) => n.name);
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
    inputData: orders,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
        sx={{ width: 1 }} // makes
      >
        <Typography variant="h4">In Progress</Typography>
        {role=='admin' && <Stack
          direction="row"
          gap={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={'From'} sx={{width: 200}}
                  value={dateFrom}
                  onChange={(newValue) => setDateFrom(dayjs(newValue))} />
            <DatePicker label={'To'} sx={{width: 200}}
                  value={dateTo}
                  onChange={(newValue) => setDateTo(dayjs(newValue))} />
            <Button><Iconify icon="tdesign:download" /></Button>
          </LocalizationProvider>
        </Stack>}
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <OrderTableHead
            order={order}
            orderBy={orderBy}
            rowCount={orders.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
            headLabel={[
              { id: "LeadNumber", label: "Trailer" },
              { id: "Company", label: "Company", hide: role=="company" },
              { id: "Description", label: "Service Type" },
              { id: "Pickup", label: "Pickup" },
              { id: "Drop", label: "Drop" },
              { id: "Status", label: "Status" },
              { id: "Date", label: "Date" },
              { id: "" },
            ]}
          />
          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <OrderTableRow
                  row={row}
                  getOrders={getOrders}
                  isMobile={isMobile}
                  role={role}
                  tab={'inprogress'}
                  selected={selected.indexOf(row.id) !== -1}
                  handleClick={(event) => handleClick(event, row.id)}
                />
              ))}

            <TableEmptyRows
              height={77}
              emptyRows={emptyRows(page, rowsPerPage, orders.length)}
            />

            {notFound && <TableNoData query={filterName} />}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Container>
    </>
  );
}
