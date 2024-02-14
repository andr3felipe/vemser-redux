import { createBrowserRouter } from "react-router-dom";
import { Default } from "./_layouts/Default";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Store } from "./pages/Store";
import { NotFound } from "./pages/NotFound";

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
    ],
  },
]);
