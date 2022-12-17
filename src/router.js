import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/orders", element: <Orders /> },
]);

export default router;
