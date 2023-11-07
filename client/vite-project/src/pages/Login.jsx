import React, { useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import useHistory for redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error messages

  const loginDetails = [
    {
      email: "sample@company.com",
      password: "1234",
    },
    {
      email: "sample@company2.com",
      password: "1234",
    },
    {
      email: "sample@company3.com",
      password: "1234",
    },
  ];

  const handleLogin = () => {
    // Find a user with matching email and password in loginDetails
    const user = loginDetails.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Successful login, clear any previous error messages
      setError("");
      // Redirect the user to the home page
      window.location.pathname = "/";
    } else {
      // Login failed, show an error message
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-[#737373] hidden  lg:flex items-center flex-col justify-center relative">
        <FiGlobe size={100} color="#f7f7f7" />
        <h1 className="text-[#f7f7f7] mt-3 font-bold text-6xl block">
          DISCOVERY
        </h1>
        <h2 className="text-[#f7f7f7] font-bold text-7xl block absolute top-[180px] -rotate-90 right-[-138px] tracking-wider">
          Welcome
        </h2>
      </div>
      <div className="w-full lg:w-1/2 flex  bg-[#e4e4e4] flex-col justify-center px-12 lg:px-44">
        <h2 className="text-3xl text-[#737373] font-semibold mb-7">Log In</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="">
          <div className="mb-4">
            <label
              className="block text-[#737373] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border text-2xl font-semibold rounded w-full py-2 px-3 text-[#737373] leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="sample@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[#737373] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border text-2xl rounded w-full py-2 px-3 text-[#737373] leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="●●●●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center mt-12">
            <button
              className="bg-[#737373] text-[#f7f7f7] font-bold py-2 px-14 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
