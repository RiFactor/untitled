import ColorModeSwitch from "./ColorModeSwitch";

const Navbar = () => {
  return (
    <nav className="flex justify-between gap-2 px-2">
      {/* links will be better */}
      <div className="flex gap-5">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/"> Contact Us</a>
      </div>
      <ColorModeSwitch />
    </nav>
  );
};

export default Navbar;
