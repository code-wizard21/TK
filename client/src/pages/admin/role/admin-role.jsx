import React, { useState, useEffect } from "react";
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
  Button,
  Stack,
  Container,
} from "@mui/material";
import { TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Http from "../../../utils/http";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from "@material-ui/icons/Edit";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 2,
  },
}));

function CollapsibleRow({
  setDeleteId,
  getCompanies,
  row,
  isMobile,
  index,
  setDeleteFlag,
  deleteflag,
  setUpdateFlag,
  setUpdateId,
  setNamelist,
  setUserEmail,
  setUserPhone,
}) {
  const [open, setOpen] = useState(false);
  const onDelete = (id) => {
    setDeleteFlag(true);
    setDeleteId(id);
  };
  const onEdit = (row) => {
    setUpdateId(row.id);
    setUpdateFlag(true);
    setNamelist(row.Name);
    setUserEmail(row.Email);
    setUserPhone(row.PhoneNumber);
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
            <span> {row.Name}</span>
          </div>
        </TableCell>
        <TableCell component="th" scope="row">
          <div className="accept">
            <span> {row.Email}</span>
          </div>
        </TableCell>

        {/* {!isMobile && (
          <TableCell component="th" scope="row">
            <div className="accept">
              <span> {row.Password}</span>
            </div>
          </TableCell>
        )} */}
        {!isMobile && <TableCell>{row.PhoneNumber}</TableCell>}
        {!isMobile && (
          <>
            <TableCell>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => onDelete(row.id)}
              >
                <RestoreFromTrashIcon />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => onEdit(row)}
              >
                <EditIcon />
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
                    {/* <TableRow>
                      <TableCell component="th" scope="row">
                        Password
                      </TableCell>
                      <TableCell>
                        <span> {row.cpass}</span>
                      </TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Phone Number
                      </TableCell>
                      <TableCell>
                        <span> {row.cnumber}</span>
                      </TableCell>
                    </TableRow>

                    <TableRow>
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
                        <IconButton
                          color="secondary"
                          aria-label="add an alarm"
                          onClick={() => onEdit(row)}
                        >
                          <EditIcon />
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
export default function ResponsiveCollapsibleTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [companies, setCompanies] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [deleteflag, setDeleteFlag] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");

  const [nameList, setNamelist] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [updateflag, setUpdateFlag] = useState(false);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    Http.get("/api/user/byrole/company")
      .then((data) => {
        setCompanies(data.data);
      })
      .catch((err) => {});
  };
  const handleOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdateFlag(false);
  };
  const handleUpdateOk = (data) => {
    console.log(updateId);

    Http.put(`/api/user/${updateId}`, {
      email: data.email,
      phone: data.phonenumber,
      name: data.username,
    })
      .then((data) => {
        getCompanies();
      })
      .catch((err) => {});
    setUpdateFlag(false);
  };
  const handleOk = (data) => {
    setOpen(false);
    Http.post("/api/user", {
      email: data.email,
      password: data.password,
      phone: data.phonenumber,
      name: data.username,
      role: "company",
    })
      .then((data) => {
        getCompanies();
      })
      .catch((err) => {});
  };
  const handlecloseOk = () => {
    console.log(deleteId);
    setDeleteFlag(false);
    Http.delete(`/api/user/${deleteId}`)
      .then((data) => {
        getCompanies();
      })
      .catch((err) => {});
  };
  const handleClosedialog = () => {
    setDeleteFlag(false);
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 4, md: 6, lg: 8 },
        // Add additional styling as needed here
      }}
    >
      <Container space={1} padding={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          sx={{ width: 1 }} // makes the Stack take the full width of the Container
        >
          <Box flexGrow={1}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              marginBottom={"40px"}
            >
              Manage Company
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
            sx={{
              ml: "auto", // move button to the right
              p: 1, // set padding (example: 1)
              m: 1, // set margin (example: 1)
            }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {isMobile && <TableCell />}
                {isMobile && <TableCell />}
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>

                {!isMobile && (
                  <>
                    {/* <StyledTableCell>Password</StyledTableCell> */}
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((row, index) => (
                <CollapsibleRow
                  getCompanies={getCompanies}
                  index={index}
                  key={row.id}
                  row={row}
                  isMobile={isMobile}
                  setDeleteFlag={setDeleteFlag}
                  deleteflag={deleteflag}
                  setDeleteId={setDeleteId}
                  setUpdateFlag={setUpdateFlag}
                  setUpdateId={setUpdateId}
                  setNamelist={setNamelist}
                  setUserEmail={setUserEmail}
                  setUserPhone={setUserPhone}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Add Company</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Please input the necessary informations for adding a company.
          </Typography>

          <form onSubmit={handleSubmit(handleOk)} style={{}}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ""}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              )}
            />
            <Controller
              name="phonenumber"
              control={control}
              defaultValue=""
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.phonenumber}
                  helperText={
                    errors.phonenumber ? errors.phonenumber.message : ""
                  }
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
                Add
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteflag}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Delete Company</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Do you really want to delete the selected information? ​
          </Typography>

          <form onSubmit={handleSubmit(handlecloseOk)} style={{}}>
            <Stack
              direction={"row"}
              style={{
                justifyContent: "right",
                gap: "8px",
              }}
            >
              <Button variant="outlined" onClick={handleClosedialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100px" }}
              >
                OK
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={updateflag}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Update Company</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Please input the necessary informations for updating a company.
          </Typography>

          <form onSubmit={handleSubmit(handleUpdateOk)} style={{}}>
            <Controller
              name="username"
              control={control}
              defaultValue={nameList}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ""}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={userEmail}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
              )}
            />

            <Controller
              name="phonenumber"
              control={control}
              defaultValue={userPhone}
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  variant="outlined"
                  style={{ marginBottom: "8px", width: "100%" }}
                  error={!!errors.phonenumber}
                  helperText={
                    errors.phonenumber ? errors.phonenumber.message : ""
                  }
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
                Update
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
