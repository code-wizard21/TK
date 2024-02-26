import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
      <div>
        <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
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
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
        </ListItem>
      </div>
    </>
  );
};
export default MainListItems;
