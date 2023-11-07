import React, { useEffect, useState } from "react";
import { FiHelpCircle, FiHeart, FiBell, FiUser, FiGlobe } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  useEffect(() => {
    // This effect runs when the location changes
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  if (isLogin) {
    // If the path is "/login", don't render the header
    return null;
  }

  return (
    <header className="bg-brownish-color text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <Link to="/">
          <div className="logo-div flex items-center">
            <FiGlobe size={28} /> {/* Question mark icon */}
            <p className="ml-3 text-2xl font-semibold">DISCOVERY</p>
          </div>
        </Link>
        {/* Icons on the right */}
        <div className="flex items-center space-x-6">
          <FiHelpCircle size={24} className="cursor-pointer" />{" "}
          {/* Question mark icon */}
          <FiHeart size={24} className="cursor-pointer" /> {/* Heart icon */}
          <FiBell size={24} className="cursor-pointer" /> {/* Bell icon */}
          <Link to="/login">
            <FiUser size={24} className="cursor-pointer" /> {/* User icon */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
