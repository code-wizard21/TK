import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
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
  TablePagination,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useForm, Controller } from "react-hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Http from "../utils/http";
import { toast } from "react-toastify";
import moment from 'moment';
import OrderTableHead from "../pages/table/order/order-table-head";
import OrderTableRow from "../pages/table/order/order-table-row";
import { applyFilter, emptyRows, getComparator } from "../pages/table/utils";
import TableEmptyRows from "../pages/table/order/table-empty-rows";
import TableNoData from "../pages/table/order/table-no-data";

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
        {/* {isMobile && (
          <TableCell>
            <IconButton size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )} */}
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
  const { orders, getOrders } = props;

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
            { id: "LeadNumber", label: "LeadNumber" },
            { id: "PupNumber", label: "PupNumber" },
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
                // status={row.State}
                company={row.Company}
                description={row.Description}
                date={row.Date}
                getOrders={getOrders}
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
    /></>
  );
}
