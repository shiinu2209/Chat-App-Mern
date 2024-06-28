import { useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register");
    if (!handleValidation()) {
      return;
    }
    console.log("Validation Passed");
    try {
      await handleValidation();
      const formData = new FormData();
      formData.append("image", image);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axiosInstance.post(
        "http://localhost:3000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === false) {
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);
      console.log(response);
      navigate("/chat");
    } catch (err) {
      console.log(err);
    }
  };
  const handleValidation = () => {
    console.log("Validation");
    if (
      !image ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      toast.error("Please fill all the fields", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
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
          <h2 className="text-3xl font-bold text-white mb-3">Register</h2>
          <form onSubmit={(e) => handleRegister(e)}>
            <div className="mb-4">
              <label htmlFor="username" className="text-white">
                Display Picture
              </label>
              <input
                type="file"
                id="Display Picture"
                className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="bg-gray-700 text-white rounded-md px-3 py-2 w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            >
              Register
            </button>
            <div className="mt-4">
              <span className="text-white">Already have an account?</span>
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 pl-2"
              >
                Login
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
