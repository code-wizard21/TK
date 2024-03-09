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
  },
  {
    title: "Rejected",
    path: "/customer/rejected",
    icon: icon("ic_user"),
  },
  {
    title: "In Progress",
    path: "/customer/accepted",
    icon: icon("ic_user"),
  },
  {
    title: "Completed",
    path: "/customer/washed",
    icon: icon("ic_user"),
  },
];

export default navConfigDefault;
