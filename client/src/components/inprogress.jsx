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
} from "@mui/material";
import OrderTableHead from "../pages/table/order/order-table-head";
import TableEmptyRows from "../pages/table/order/table-empty-rows";
import { applyFilter, emptyRows, getComparator } from "../pages/table/utils";
import OrderTableRow from "../pages/table/order/order-table-row";
import TableNoData from "../pages/table/order/table-no-data";
import Http from "../utils/http";
import { useSelector } from "react-redux";
import { Container, Stack } from "@mui/system";
import { STATUS_ACCEPTED, STATUS_WASHED } from "../store/constant";

export default function AcceptedList(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("Date");
  const [filterName, setFilterName] = useState("");
  const [orders, setOrders] = useState([]);
  const auth = useSelector(state => state.auth);
  const role = auth.user.job;
  const getOrders = () => {
    Http.post(`/api/order/bystatus/${STATUS_ACCEPTED},${STATUS_WASHED}`, { company: auth.user.job=='company'?auth.user.name:'' })
      .then((data) => {
        setOrders(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

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
              { id: "Company", label: "Company" },
              { id: "Description", label: "Service Type" },
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
