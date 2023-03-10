import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  useEffect(() => {
    if (email & !role) {
      navigate("/register");
    }
  }, [navigate, email, role]);
  const handelSignOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}>
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBox</Link>
        </li>
        <li>
          <Link className="hover:text-primary transition-all" to="/jobs">
            Jobs
          </Link>
        </li>
        {email && role && (
          <li>
            <Link className="hover:text-primary transition-all" to="/dashboard">
              Dashboard
            </Link>
          </li>
        )}
        {email && !role && (
          <li>
            <Link className="hover:text-primary transition-all" to="/register">
              Get Started
            </Link>
          </li>
        )}

        {email ? (
          <button
            onClick={handelSignOut}
            className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all ">
            Log Out
          </button>
        ) : (
          <li>
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
