import { NavLink } from "react-router-dom";
import ColorModeSwitch from "components/ColorModeSwitch";
import NavButton from "./ui/NavButton";

const Navbar = () => {
  return (
    <nav className="flex justify-between gap-2 p-4">
      <div className="flex gap-5">
        <NavButton name="Home" to="/"></NavButton>
        <NavButton name="Calculator" to="calculator"></NavButton>
        <NavButton name="Drawing Pad" to="drawing-pad"></NavButton>
      </div>
      <ColorModeSwitch />
    </nav>
  );
};

export default Navbar;
