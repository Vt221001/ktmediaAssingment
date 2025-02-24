import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../components/Ui/Input";
import Button from "../components/Ui/Button";
import jobImg from "../assets/asssingImg.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import SideImage from "../components/Login/Register/SideImage";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data);
        const { accessToken, refreshToken } = response.data.data;
        login(accessToken, refreshToken);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Login Form Section */}
      <div className="w-full md:min-w-3xl flex flex-col flex-1 justify-center text-center md:text-left px-6 lg:px-16">
        <div>
          <h2 className="text-3xl font-semibold mb-1">
            Already have an account?
          </h2>
          <p className="text-gray-500 text-md md:text-md mb-8">
            Your personal job finder is here
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <Input
              placeholder="Email"
              className="w-full border p-4 text-lg rounded-lg mb-3"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Input
              placeholder="Password"
              type="password"
              className="w-full border p-4 text-lg rounded-lg mb-3"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <Button
              type="submit"
              className="w-56 bg-red-400 text-white py-2 hover:bg-red-500 rounded-lg text-lg"
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-black text-md font-semibold underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              {""}
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Image Section (Hidden in Mobile View) */}
      <div className="w-full relative md:w-2xl  h-full hidden md:block">
        <SideImage />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
