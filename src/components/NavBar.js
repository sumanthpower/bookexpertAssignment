import React from "react";
import { toggleMenu } from "../utils/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const employee = useSelector((store) => store.emp.employees);
  console.log("afterSearch", employee);
  const navigate = useNavigate();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    document.cookie =
      "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie =
      "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 w-full bg-slate-400 flex items-center justify-around h-14 shadow-lg sticky print:hidden ">
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost ml-8"
          onClick={() => toggleMenuHandler()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl ml-2">BookExpert</a>
        <a className="btn btn-ghost text-xl ml-2 text-red-500">
          Emp Count:{" "}
          <span className="text-green-700 text-3xl rounded-xl  px-2 py-1 border-2">
            {employee.length}
          </span>
        </a>
      </div>

      <div className="avatar mr-40">
        <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 flex items-center">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="mr-4"
          />
          <button
            className=" bg-slate-700 p-1 text-white rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
