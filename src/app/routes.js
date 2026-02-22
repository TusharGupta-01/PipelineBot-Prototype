import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { LiveMonitoring } from "./pages/LiveMonitoring";
import { LeakAlert } from "./pages/LeakAlert";
import { RobotControl } from "./pages/RobotControl";
import { Reports } from "./pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "monitoring", Component: LiveMonitoring },
      { path: "alerts", Component: LeakAlert },
      { path: "control", Component: RobotControl },
      { path: "reports", Component: Reports },
    ],
  },
]);
