import { Link, NavLink, useNavigate } from "react-router-dom";
import userLogo from "../../assets/user.png";
import logo from "/demoLogo.png";
import { useEffect, useState } from "react";
import { BiSolidMoon } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../shared/useAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
              : "mr-1 text-sky-400 hover:text-yellow-500 font-semibold text-lg"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      {!user ? (
        <li>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending "
                : isActive
                ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
                : "mr-1 text-sky-400 hover:text-yellow-500 font-semibold text-lg"
            }
          >
            Login
          </NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink
              to="all-tasks"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending "
                  : isActive
                  ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
                  : "mr-1 text-sky-400 hover:text-yellow-500 font-semibold text-lg"
              }
            >
              All Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add-task"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending "
                  : isActive
                  ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
                  : "mr-1 text-sky-400 hover:text-yellow-500 font-semibold text-lg"
              }
            >
              Add Task
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className="mx-auto navbar bg-base-100 opacity-90 sticky top-0 z-50 py-5"
      style={{}}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu></AiOutlineMenu>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-200 rounded-box w-64"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <div className="flex flex-col md:flex-row items-center">
            <img src={logo} className="w-20" alt="" />
            <span className="text-blue-500 text-2xl md:mr-1">Task</span>{" "}
            <span className="text-teal-500 text-2xl font-semibold">
              Manager
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex justify-between">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user && (
          <p className="text-lg font-semibold text-blueViolet">
            {user.displayName}
          </p>
        )}

        <div className="dropdown dropdown-end mr-3 ml-3">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user ? user?.photoURL : userLogo} alt="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-purple-400"
          >
            <li>
              {user ? (
                <button onClick={handleLogOut}>LogOut</button>
              ) : (
                <Link to="/login">
                  <button>LogIn</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div>
          <label className="swap swap-rotate">
            <input onClick={toggleTheme} type="checkbox" />
            <div className="swap-on">
              <BiSolidMoon className="text-2xl text-blueViolet"></BiSolidMoon>
            </div>
            <div className="swap-off">
              <BsSun className="text-2xl text-blueViolet"></BsSun>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
