import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Calculator from "./components/Calculator";
import ErrorPage from "pages/ErrorPage";
import DrawingPad from "components/DrawingPad";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "calculator", element: <Calculator /> },
      { path: "drawing-pad", element: <DrawingPad /> }
    ]
  }
]);

export default router;
