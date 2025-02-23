import React, { use } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Ui/Input";
import Button from "../components/Ui/Button";
import jobImg from "../assets/JobSeeker.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import SideImage from "../components/Login/Register/SideImage";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    delete data.terms;
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        data
      );
      const { accessToken, refreshToken } = response.data.data;
      toast.success("Account created successfully!", { autoClose: 2000 });

      login(accessToken, refreshToken);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Section - Register Form */}
      <div className="w-full md:min-w-3xl flex flex-col flex-1 justify-center text-center md:text-left px-6 lg:px-24">
        <h2 className="text-3xl font-semibold mb-1">
          Create an account
        </h2>
        <p className="text-gray-500 text-md md:text-md mb-6">
          Your personal job finder is here
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <Input
            placeholder="Name"
            className="w-full border p-4 text-lg rounded-lg mb-4"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <Input
            placeholder="Email"
            className="w-full border p-4 text-lg rounded-lg mb-4"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input
            placeholder="PhoneNumber"
            className="w-full border p-4 text-lg rounded-lg mb-4"
            type="tel"
            {...register("phoneNumber", {
              required: "Mobile number is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}

          <Input
            placeholder="Password"
            type="password"
            className="w-full border p-4 text-lg rounded-lg mb-4"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              {...register("terms", {
                required: "You must agree to the terms",
              })}
            />
            <p className="text-gray-600 text-sm">
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-60 border bg-red-400 hover:bg-red-500 text-white py-3 rounded-lg text-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            className="text-black font-semibold underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>

      {/* Right Section - Image with Overlay Text */}
      <div className="w-full relative md:w-2xl bg-amber-200 h-full hidden md:block">
        <SideImage />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
