import Iconify from "../../components/iconify";
import SvgColor from "../../components/svg-color";
import { STATUS_ACCEPTED, STATUS_REJECTED, STATUS_REQUESTED, STATUS_WASHED } from "../../store/constant";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfigDefault = [
  // {
  //   title: "dashboard",
  //   path: "/",
  //   icon: icon("ic_analytics"),
  // },
  {
    title: "Requested",
    path: "/customer/" + STATUS_REQUESTED,
    icon: icon("ic_user"),
    icon: <Iconify icon="material-symbols:pending-actions" />,
  },
  {
    title: "Rejected",
    path: "/customer/" + STATUS_REJECTED,
    icon: <Iconify icon="fluent:text-change-reject-24-filled" />,
  },
  {
    title: "In Progress",
    path: "/customer/" + STATUS_ACCEPTED,
    icon: <Iconify icon="ri:progress-3-line" />,
  },
  {
    title: "Completed",
    path: "/customer/" + STATUS_WASHED,
    icon: <Iconify icon="ic:twotone-done" />,
  },
];

export default navConfigDefault;
