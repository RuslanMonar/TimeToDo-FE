import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const routerConfig = [
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Dashboard,
        path: "/",
      },
    ],
  },
  {
    Component: Auth,
    path: "/login",
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
