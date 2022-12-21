import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Terms from "./pages/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/orders", element: <Orders /> },
  { path: "/terms", element: <Terms /> },
]);

export default router;
