import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import Swal from "sweetalert2";
const Signup = () => {
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
          className="form p-6 bg-white rounded-xl w-full mx-auto"
        >
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Signup
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-6 mb-2">
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
              Signup
            </button>
          </div>
          <p className="text-center login-account text-[16px] font-medium mt-4">
            Already have an account ?
            <Link to="/login" className="create-account text-blue-600 ms-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
