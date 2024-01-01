import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    // Upload image
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { username, email, firstName, lastName, gender, password } =
            data;

          // Create user object with image URL
          const newUser = {
            username,
            email,
            firstName,
            lastName,
            gender,
            password,
            image: imgURL,
          };

          // Now, perform the login process using the newUser object
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
        }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-6">
            <div>
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
              <label className="block text-black text-[16px] font-semibold mb-1">
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
          </div>
          <div>
            <label className="block text-black text-lg font-semibold mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="form-input"
            />
            {errors.email && (
              <span className="text-red-600 mt-1 text-[16px] font-medium">
                {errors.email?.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-6 mb-2">
            <div>
              <label className="block text-black text-lg font-semibold mb-1">
                FirstName <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="firstName"
                {...register("firstName", {
                  required: "FirstName is required",
                })}
                className="form-input"
              />
              {errors.firstName && (
                <span className="text-red-600 mt-1 text-[16px] font-medium">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-black text-lg font-semibold mb-1">
                LastName <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="lastName"
                {...register("lastName", { required: "LastName is required" })}
                className="form-input"
              />
              {errors.lastName && (
                <span className="text-red-600 mt-1 text-[16px] font-medium">
                  {errors.lastName?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-black text-lg font-semibold mb-1">
              Gender <span className="text-red-600">*</span>
            </label>
            <select className="form-input" {...register("gender")}>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {errors.gender && (
              <span className="text-red-600 mt-1 text-[16px] font-medium">
                {errors.gender?.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-black text-lg font-semibold mb-1">
              Image <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              className="text-base"
              {...register("image", { required: true })}
            />
          </div>
          <div className="flex justify-center">
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
