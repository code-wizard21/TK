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
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
// ----------------------------------------------------------------------

export default function CompanyTableRow({
  selected,
  name,
  email,
  role,
  status,
  handleClick,
  getCompanies,
  key,
  id,
  setUpdateFlag,
  setUpdateId,
}) {
  const [open, setOpen] = useState(null);
  const [deleteflag, setDeleteFlag] = useState(false);
  const handleCloseDelete = () => {
    setDeleteFlag(false);
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleUpdateMenu = () => {
    handleCloseMenu();
    setUpdateFlag(true);
    setUpdateId(id);
  };
  const handleDeleteMenu = () => {
    handleCloseMenu();
    setDeleteFlag(true);
  };
  const confirmDelete = () => {
    Http.delete(`/api/user/${id}`)
      .then((data) => {
        getCompanies();
      })
      .catch((err) => {});
  }
  const onDisable = () => {
    handleCloseMenu();
    Http.post("/api/user/disable", { id: id })
      .then((data) => {
        getCompanies();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEnable = () => {
    handleCloseMenu();
    Http.post("/api/user/enable", { id: id })
      .then((data) => {
        getCompanies();
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

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{role}</TableCell>

        {/* <TableCell align="center">{isVerified ? "Yes" : "No"}</TableCell> */}

        <TableCell>
          <Label color={(status === "Disabled" && "error") || "success"}>
            {status || "Enabled"}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
        <MenuItem onClick={handleUpdateMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {status == "Disabled" ? (
          <MenuItem onClick={onEnable} sx={{ color: "error.main" }}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Enable
          </MenuItem>
        ) : (
          <MenuItem onClick={onDisable} sx={{ color: "error.main" }}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Disable
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      
      <Dialog
        open={deleteflag}
        onClose={handleCloseDelete}
        PaperProps={{
          sx: {
            width: "80%", // You can use any valid CSS value here
            maxWidth: "400px", // Optional: you can set a maximum width as well
          },
        }}
      >
        <DialogTitle>Delete confirmation</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Are you sure to delete?
          </Typography>

          <Stack
            direction={"row"}
            style={{
              justifyContent: "right",
              gap: "8px",
            }}
          >
            <Button variant="outlined" onClick={handleCloseDelete}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100px" }}
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

CompanyTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
