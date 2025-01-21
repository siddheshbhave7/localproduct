import { Link, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import { useTheme } from "../context/themeContext";
import { useEffect, useState } from "react";
import logo from '../assets/logo.png'

const HeaderNavbar = () => {
  const { themeMode } = useTheme();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  function checkUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  useEffect(() => {
    setIsUserLoggedIn(checkUser());
  },[] );

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-gray-800 text-white" : "bg-yellow-100"
      } py-8 px-4`}
    >
      <nav>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h1>My Website</h1>
          </div>

          <div className="flex items-center">
            {isUserLoggedIn ? (
              <>
                <Link to="/home">
                  <button className="mr-4">Home</button>
                </Link>
                <Link to="/cart">
                  <button className="mr-4">Cart</button>
                </Link>
                <Link to="/login">
                  <button
                    onClick={() => {
                      localStorage.removeItem("user"); 
                      setIsUserLoggedIn(false);
                      navigate("/login"); 
                    }}
                  >
                    Logout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="mr-4">Signup</button>
                </Link>
                <Link to="/login">
                  <button className="mr-4">Login</button>
                </Link>
              </>
            )}
          </div>

          <Theme />
        </div>
      </nav>
    </div>
  );
};

export default HeaderNavbar;
