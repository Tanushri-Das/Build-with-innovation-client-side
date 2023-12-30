import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert2";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center my-12 mx-8 sm:mx-0">
      <div className="w-full flex-shrink-0 sm:max-w-2xl bg-base-100 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form p-6 bg-white rounded-xl w-full lg:w-3/4 mx-auto"
        >
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Login
          </h1>
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="flex justify-center">
            <button className="login-btn text-lg font-semibold text-white px-8 py-3">
              Login
            </button>
          </div>
          <p className="text-center login-account text-[16px] font-medium mt-4">
            Don’t have an account ?
            <Link to="/signup" className="create-account text-blue-600 ms-1">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
