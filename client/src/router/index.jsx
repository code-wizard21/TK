import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { lazy } from "react";
import PageLayout from "../components/layout";

const CompanyDashboard = lazy(() => import("../pages/company"));
const DriverDashboard = lazy(() => import("../pages/driver"));
const WasherDashboard = lazy(() => import("../pages/washer"));

const Login = lazy(() => import("../components/auth/Login"));
const LandingPage = lazy(() => import("../pages/landing"));
const Admin = lazy(() => import("../pages/admin"));
const AdminRole = lazy(() => import("../pages/admin/role/admin-role"));
const DriverRole = lazy(() => import("../pages/admin/role/driver-role"));
const WasherRole = lazy(() => import("../pages/admin/role/washer-role"));

const RejectedList = lazy(() => import("../components/rejected"));

function RoutesDefined() {
  return (
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
          <Route path="/" element={<PageLayout />}>
            <Route path="company/dashboard" element={<CompanyDashboard />} />
            <Route path="driver/dashboard" element={<DriverDashboard />} />
            <Route path="washer/dashboard" element={<WasherDashboard />} />
            <Route path="admin" element={<Admin />}>
              <Route index element={<AdminRole />} />
              <Route path="driver-role" element={<DriverRole />} />
              <Route path="washer-role" element={<WasherRole />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
export default RoutesDefined;
