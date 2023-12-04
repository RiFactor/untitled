import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  name?: string;
  to?: any;
}

const NavButton = ({ name, to }: IProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-link font-bold w-18 ${isActive && "dark:text-cyan-300 underline "} `}
    >
      {name}
    </NavLink>
  );
};

export default NavButton;
