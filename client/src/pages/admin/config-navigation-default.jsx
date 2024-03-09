import Iconify from "../../components/iconify";
import SvgColor from "../../components/svg-color";

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
    path: "/customer/requested",
    icon: icon("ic_user"),
    icon: <Iconify icon="material-symbols:pending-actions" />,
  },
  {
    title: "Rejected",
    path: "/customer/rejected",
    icon: <Iconify icon="fluent:text-change-reject-24-filled" />,
  },
  {
    title: "In Progress",
    path: "/customer/accepted",
    icon: <Iconify icon="ri:progress-3-line" />,
  },
  {
    title: "Completed",
    path: "/customer/washed",
    icon: <Iconify icon="ic:twotone-done" />,
  },
];

export default navConfigDefault;
