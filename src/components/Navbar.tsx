import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
// import ColorModeSwitch from "components/ColorModeSwitch"; // Question -- help get absolute referencing

const Navbar = () => {
  return (
    <nav className="flex justify-between gap-2">
      {/* links will be better */}
      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/calculator">Calculator</Link>
      </div>
      <ColorModeSwitch />
    </nav>
  );
};

export default Navbar;
