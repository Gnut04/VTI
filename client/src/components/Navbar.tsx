import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>

        <NavLink to="/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/login" className={navClass}>
          Login
        </NavLink>

        <NavLink to="/register" className={navClass}>
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;