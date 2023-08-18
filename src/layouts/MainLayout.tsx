import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";

const MainLayout = () => {
  return (
    // can make this a main tag and add custom styling
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
