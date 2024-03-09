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
];

export default navConfig;
