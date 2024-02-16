import { createBrowserRouter } from "react-router-dom";
import { Default } from "./_layouts/Default";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Store } from "./pages/Store";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Authenticated } from "./_layouts/Authenticated";
import { Panel } from "./pages/Panel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "/store/product/:id",
        element: <Product />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authenticated />,
    errorElement: <NotFound />,
    children: [
      {
        path: "panel",
        element: <Panel />,
      },
    ],
  },
]);
