import { Form, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Calculator from "./components/Calculator";
import ErrorPage from "pages/ErrorPage";
import DrawingPad from "components/DrawingPad";
import ReactAdmin from "components/ReactAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "calculator", element: <Calculator /> },
      { path: "drawing-pad", element: <DrawingPad /> },
      { path: "form", element: <Form /> },
      { path: "react-admin", element: <ReactAdmin /> }
    ]
  }
]);

export default router;
