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
  setUpdateFlag,
  setUpdateId,
}) {
  const [open, setOpen] = useState(null);

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
    Http.delete(`/api/order/${id}`)
      .then((data) => {
        getOrders();
      })
      .catch((err) => {});
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
        <MenuItem onClick={handleDeleteMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
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
