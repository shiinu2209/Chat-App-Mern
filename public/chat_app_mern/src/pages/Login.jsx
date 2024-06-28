import { useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!handleValidation) {
      return;
    }
    console.log("Validation Passed");
    const response = await axiosInstance.post(
      "http://localhost:3000/api/users/login",
      {
        email,
        password,
      }
    );
    if (response.data.status === false) {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log(response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("username", response.data.username);
    navigate("/chat");
  };
  const handleValidation = () => {
    if (!email || !password) {
      console.log("hellowworld");
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Login successful", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-gray-900 text-white p-2 absolute left-[10px] top-[10px] flex z-[0px]">
          <span>
            <FaRocketchat className="text-6xl" />
          </span>
          <span className=" flex items-center justify-center ">Snappy</span>
        </div>
        <div className="bg-gray-800 m-[50px] p-8 pb-2 rounded-lg shadow-lg w-6/12 xl:w-6/12 md:w-6/12 max-md:mt-[100px] z-10">
          <h2 className="text-3xl font-bold text-white mb-3">Login</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-4">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Login
            </button>
            <div className="mt-4">
              <span className="text-white">{"Don't"} have an account?</span>
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-600 pl-2"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Register;
