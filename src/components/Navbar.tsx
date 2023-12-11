import { NavLink } from "react-router-dom";
import ColorModeSwitch from "components/ColorModeSwitch";
import NavButton from "./ui/NavButton";
import { FormattedMessage } from "react-intl";

const Navbar = () => {
  return (
    <nav className="flex justify-between gap-2 p-4">
      <div className="flex gap-5">
        <NavButton name="Home" to="/">
          {/* <FormattedMessage id="example" /> */}
        </NavButton>
        <NavButton name="Calculator" to="calculator"></NavButton>
        <NavButton name="Drawing Pad" to="drawing-pad"></NavButton>
        <NavButton name="Form" to="form"></NavButton>
        <NavButton name="RA" to="react-admin"></NavButton>
        <NavButton name="Gauge" to="gauge"></NavButton>
        <NavButton name="Custom Gauge" to="custom-gauge"></NavButton>
      </div>
      <ColorModeSwitch />
    </nav>
  );
};

export default Navbar;
