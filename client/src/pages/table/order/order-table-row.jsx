import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Http from "../../../utils/http";
import moment from "moment";
import { toast } from "react-toastify";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
// ----------------------------------------------------------------------

export default function OrderTableRow({
  selected,
  lead,
  pup,
  company,
  pickup,
  handleClick,
  getOrders,
  drop,
  date,
  description,
  id,
  key,
  role,
  tab,
}) {
  const [open, setOpen] = useState(null);
  const [openRejecter, setOpenRejecter] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

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
    Http.post(`/api/order/accept`, {id})
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
    Http.post("/api/order/reject", { id, ...data })
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
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>{lead}</TableCell>
        <TableCell>{pup}</TableCell>
        <TableCell>{company}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{pickup}</TableCell>
        <TableCell>{drop}</TableCell>
        <TableCell>{moment(date).format('YYYY-MM-DD')}</TableCell>
        {role=="washer" && tab=="requested" && <TableCell align="right">
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
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Accept
          </MenuItem>
          <MenuItem onClick={handleRejectMenu} sx={{ color: "error.main" }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Reject
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
