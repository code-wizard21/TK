import { useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { users } from "../../../_mock/user";

import Iconify from "../../../components/iconify/index";
import Scrollbar from "../../../components/scrollbar/index";
import { TextField, Unstable_Grid2 as Grid } from "@mui/material";
import TableNoData from "./table-no-data";
import UserTableRow from "./driver-table-row";
import UserTableHead from "./driver-table-head";
import TableEmptyRows from "./table-empty-rows";
import UserTableToolbar from "./driver-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { useForm, Controller } from "react-hook-form";
import Http from "../../../utils/http";
import AddUserModal from "./driver-add";
import UpdateUserModal from "./driver-update";
// ----------------------------------------------------------------------

export default function UserPage(prop) {
  const { company, getCompanies } = prop;
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("Name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const [updateId, setUpdateId] = useState("");

  const [updateflag, setUpdateFlag] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateFlag(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = company.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
    inputData: company,
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
          mb={5}
        >
          <Typography variant="h4">Company</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New Company
          </Button>
        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={company.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: "Name", label: "Company" },
                    { id: "Email", label: "Email" },
                    { id: "PhoneNumber", label: "PhoneNumber" },
                    // { id: "isVerified", label: "Verified", align: "center" },
                    { id: "State", label: "Status" },
                    { id: "" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        id={row.id}
                        name={row.Name}
                        role={row.PhoneNumber}
                        status={row.State}
                        email={row.Email}
                        getCompanies={getCompanies}
                        setUpdateFlag={setUpdateFlag}
                        setUpdateId={setUpdateId}
                        // avatarUrl={row.avatarUrl}
                        // isVerified={row.isVerified}
                        selected={selected.indexOf(row.id) !== -1}
                        handleClick={(event) => handleClick(event, row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, company.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={company.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {<AddUserModal open={open} setOpen={setOpen} onAdd={prop.getCompanies} handleClose={handleClose} />}
      {<UpdateUserModal updateflag={updateflag} setUpdateFlag={setUpdateFlag} onUpdate={prop.getCompanies} handleClose={handleClose} updateId={updateId} />}
    </>
  );
}
