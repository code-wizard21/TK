import Iconify from "../../components/iconify";
import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  // {
  //   title: "dashboard",
  //   path: "/",
  //   icon: icon("ic_analytics"),
  // },
  {
    seperator: true,
    label: "Users",
  },
  {
    title: "Company",
    path: "/admin",
    icon: icon("ic_user"),
  },
  {
    title: "Washer",
    path: "/admin/washer-role",
    icon: icon("ic_user"),
  },
  {
    title: "Driver",
    path: "/admin/driver-role",
    icon: icon("ic_user"),
  },
  {
    seperator: true,
    label: "Reports",
  },
  {
    title: "Completed",
    path: "/admin/completed",
    icon: <Iconify icon="ic:twotone-done" />,
  },
  {
    title: "Rejected",
    path: "/admin/rejected",
    icon: <Iconify icon="fluent:text-change-reject-24-filled" />,
  },
  {
    title: "Cancelled",
    path: "/admin/cancelled",
    icon: <Iconify icon="fluent:text-change-reject-24-filled" />,
  },
  {
    title: "In Progress",
    path: "/admin/inprogress",
    icon: <Iconify icon="ri:progress-3-line" />,
  },
];

export default navConfig;
