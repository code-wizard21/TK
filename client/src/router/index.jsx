import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { lazy } from "react";
import ThemeProvider from "../../src/theme";
import PageLayout from "../components/layout/default";
import AdminLayout from "../components/layout/admin";
import RequestedList from "../components/requested";
import RejectedList from "../components/rejected";
import AcceptedList from "../components/accepted";
import CompletedList from "../components/completed";
const CompanyDashboard = lazy(() => import("../pages/company"));
const DriverDashboard = lazy(() => import("../pages/driver"));
const WasherDashboard = lazy(() => import("../pages/washer"));

const Login = lazy(() => import("../components/auth/Login"));
const LandingPage = lazy(() => import("../pages/landing"));

const CompanyManage = lazy(() => import("../pages/admin/role/company-role"));
const DriverRole = lazy(() => import("../pages/admin/role/driver-role"));
const WasherRole = lazy(() => import("../pages/admin/role/washer-role"));

function RoutesDefined() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress size={70} />
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/customer" element={<PageLayout />}>
              <Route path="requested" element={<RequestedList />} />
              <Route path="rejected" element={<RejectedList />} />
              <Route path="accepted" element={<AcceptedList />} />
              <Route path="washed" element={<CompletedList />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<CompanyManage />} />
              <Route path="driver-role" element={<DriverRole />} />
              <Route path="washer-role" element={<WasherRole />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}
export default RoutesDefined;
