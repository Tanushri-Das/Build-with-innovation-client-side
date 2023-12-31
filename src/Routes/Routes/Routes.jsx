import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import HomePage from "../../Pages/HomePage/HomePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element:<Home />,
      },
      {
        path: "/home",
        element: <PrivateRoute><HomePage /></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
]);
export default routes;