import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Iconify from "../../../components/iconify";
import Http from "../../../utils/http";
import moment from "moment";
import { toast } from "react-toastify";
import { Button, Dialog, DialogContent, DialogTitle, Unstable_Grid2 as Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { STATUS_REQUESTED, STATUS_WASHED } from "../../../store/constant";
import Label from "../../../components/label";
// ----------------------------------------------------------------------

export default function OrderTableRow({
  selected,
  handleClick,
  getOrders,
  row,
  role,
  tab,
}) {
  const [open, setOpen] = useState(null);
  const [dateNew, setDateNew] = useState(dayjs());
  const [openRejecter, setOpenRejecter] = useState(false);
  const [openResender, setOpenResender] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();
  const {
    control1,
    handleSubmit1,
    formState: { errors1 },
    reset1,
    register1,
  } = useForm();
  const onResend = () => {
    setOpenResender(true);
    reset();
  };
  const onCancelOrder = () => {
    Http.post("/api/order/cancel", { id: row.id })
      .then((data) => {
        getOrders();

        toast.success("Successfully cancelled.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onComplete = () => {
    Http.post("/api/order/complete", { id: row.id })
      .then((data) => {
        getOrders();

        toast.success("Successfully marked as completed.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseResend = () => {
    setOpenResender(false);
  };
  const handleOkResend = (data) => {
    setOpenResender(false);
    Http.put("/api/order/bystatus/" + STATUS_REQUESTED, { id: row.id, date: dateNew })
      .then((data) => {
        getOrders();

        toast.success(" Request successfully resent.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onWashed = () => {
    Http.post("/api/order/wash", { id: row.id })
      .then((data) => {
        handleCloseMenu();
        getOrders();
        toast.success(" Successfully marked as washed.", {
          hideProgressBar: true,
        });
      })
      .catch((err) => {});
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCloseRejector = () => {
    setOpenRejecter(false);
  };
  const handleAcceptMenu = () => {
    // handleCloseMenu();
    // setUpdateFlag(true);
    // setUpdateId(id);
    
    handleCloseMenu();
    Http.post(`/api/order/accept`, {id: row.id})
      .then((data) => {
        toast.success(" Request successfully accepted.", {
          hideProgressBar: true,
        });
        getOrders();
      })
      .catch((err) => {});
  };
  const handleRejectMenu = () => {
    handleCloseMenu();
    setOpenRejecter(true);
  };
  const handleOkToReject = (data) => {
    setOpenRejecter(false);
    Http.post("/api/order/reject", { id: row.id, ...data })
      .then((data) => {
        getOrders();
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
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={row.id}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{row.LeadNumber}-{row.PupNumber}</TableCell>
        {role!=="company" && <TableCell>{row.Company}</TableCell>}
        <TableCell>{row.Description}</TableCell>
        <TableCell>{row.Pickup}</TableCell>
        <TableCell>{row.Drop}</TableCell>
        {tab=="rejected" && <TableCell>{row.Reason}</TableCell>}
        {tab=="inprogress" && <TableCell>
          <Label color={(row.Status === STATUS_WASHED && "success") || "error"}>
            {row.Status==STATUS_WASHED?"Washed":"Unwashed"}
          </Label></TableCell>}
        <TableCell>{moment(row.Date).format('YYYY-MM-DD')}</TableCell>
        {
        (
          (role=="washer" && tab=="requested") ||
          (role=="washer" && tab=="inprogress") ||
          ((role=="driver" || role=="company") && tab=="rejected") ||
          (role=="driver" && row.Status == STATUS_WASHED && tab=="inprogress")
        )
        && <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>}
      </TableRow>
      {role=="washer" && tab=="requested" && 
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleAcceptMenu}>
            <Iconify icon="fluent:text-change-accept-24-filled" sx={{ mr: 2 }} />
            Accept
          </MenuItem>
          <MenuItem onClick={handleRejectMenu} sx={{ color: "error.main" }}>
            <Iconify icon="fluent:text-change-reject-24-filled" sx={{ mr: 2 }} />
            Reject
          </MenuItem>
        </Popover>
      }
      {role=="washer" && tab=="inprogress" && 
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={onWashed}>
            <Iconify icon="fluent-mdl2:accept-medium" sx={{ mr: 2 }} />
            Mark Washed
          </MenuItem>
        </Popover>
      }
      {(role=="driver" || role=="company") && tab=="rejected" && 
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={onResend}>
            <Iconify icon="mdi:email-resend-outline" sx={{ mr: 2 }} />
            Resend
          </MenuItem>
          <MenuItem onClick={onCancelOrder} sx={{ color: "error.main" }}>
            <Iconify icon="mdi:cancel" sx={{ mr: 2, color: "error.main" }} />
            Cancel
          </MenuItem>
        </Popover>
      }
      {role=="driver" && row.Status == STATUS_WASHED && tab=="inprogress" && 
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 160 },
          }}
        >
          <MenuItem onClick={onComplete}>
            <Iconify icon="fluent-mdl2:accept-medium" sx={{ mr: 2 }} />
            Mark Completed
          </MenuItem>
        </Popover>
      }
      <Dialog
        open={openRejecter}
        onClose={handleCloseRejector}
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

          <form onSubmit={handleSubmit(handleOkToReject)} style={{}}>
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
              <Button variant="outlined" onClick={handleCloseRejector}>
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
      <Dialog
        open={openResender}
        onClose={handleCloseResend}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Request Again</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>Please select new date.</Typography>

          <form onSubmit={handleSubmit(handleOkResend)} style={{}}>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Grid xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="">
                      <DateCalendar
                        value={dateNew}
                        onChange={(newValue) => setDateNew(dayjs(newValue))}
                        sx={{ width: "270px" }}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </Grid>
              )}
            />

            <Stack
              direction={"row"}
              style={{
                justifyContent: "right",
                gap: "8px",
              }}
            >
              <Button variant="outlined" onClick={handleCloseResend}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100px" }}
              >
                Request
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

OrderTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  order: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
