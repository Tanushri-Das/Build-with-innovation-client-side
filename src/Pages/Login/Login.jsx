import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR",
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((loginResponse) => {
        if (loginResponse.token) {
          // Save the token (you can use localStorage or a state management library)
          const authToken = loginResponse.token;

          // Perform actions with the token, e.g., save to localStorage
          localStorage.setItem("authToken", authToken);
          Swal.fire({
            title: "Good job!",
            text: "You Login Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          // Navigate or perform other actions as needed
          navigate("/home"); // Navigate to the desired route
        } else {
          // Handle login failure
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid username or password",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center my-12 mx-8 sm:mx-0">
      <div className="w-full flex-shrink-0 sm:max-w-2xl bg-base-100 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form p-6 bg-white rounded-xl w-full mx-auto"
        >
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Login
          </h1>
          <div className="mb-1">
            <label className="block text-black text-lg font-semibold mb-1">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              {...register("username", { required: "Username is required" })}
              className="form-input"
            />
            {errors.username && (
              <span className="text-red-600 mt-1 text-[16px] font-medium">
                {errors.username?.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-black text-lg font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                  maxLength: 10,
                })}
                className="form-input w-full"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-600 mt-1">
                {errors.password?.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-600 mt-1">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-600 mt-1">
                Password must not exceed 10 characters
              </span>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button className="login-btn text-lg font-semibold text-white px-8 py-3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
