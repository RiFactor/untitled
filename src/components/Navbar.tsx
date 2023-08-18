import { NavLink } from "react-router-dom";
import ColorModeSwitch from "components/ColorModeSwitch";

const Navbar = () => {
  return (
    <nav className="flex justify-between gap-2 p-4">
      <div className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link font-bold w-18 ${isActive && "dark:text-cyan-300 underline "} `}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-link font-bold w-18 ${isActive && "dark:text-cyan-300 font-bold underline"} `
          }
          to="/calculator"
        >
          Calculator
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-link font-bold w-18 ${isActive && "dark:text-cyan-300 font-bold underline"} `
          }
          to="/drawing-pad"
        >
          Drawing Pad
        </NavLink>
      </div>
      <ColorModeSwitch />
    </nav>
  );
};

export default Navbar;
