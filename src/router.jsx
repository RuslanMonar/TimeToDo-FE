import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";

const routerConfig = [
//   {
//     Component: App,
//     path: "/",
//   },
  {
    Component: Auth,
    path: "/",
  }
];

const router = createBrowserRouter(routerConfig);

export default router;
