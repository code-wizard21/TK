import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

const MainListItems = () => {
  return (
    <>
      <Divider />
      <div>
        <ListSubheader inset>Users</ListSubheader>
        <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Company" />
          </ListItem>
        </Link>

        <Link
          to="/admin/driver-role"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Driver" />
          </ListItem>
        </Link>
        <Link
          to="/admin/washer-role"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button>
            <ListItemIcon>
              <CleaningServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Washer" />
          </ListItem>
        </Link>
      </div>
      <Divider />
      <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItem>
      </div>
    </>
  );
};
export default MainListItems;
