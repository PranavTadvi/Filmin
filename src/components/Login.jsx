import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  return (
    <div className="w-full flex mt-4 justify-center flex-col items-center">
      <h1 className="my-3 text-4xl font-bold">Login</h1>
      <div class="flex  flex-col w-full  md:w-4/12 mt-3  ">
        <div class="p-2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white-500">
              Mobile No
            </label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              c
            />
          </div>
        </div>
        <div class="p-2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-white-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>
        <div class="p-2 mt-3">
          <button class="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            {loader ? <TailSpin height={25} color="white" /> : "Login"}
          </button>
        </div>
        <div class="p-2 mt-3 flex justify-center">
          <p>
            Do not have account?
            <Link to={"/signup"}>
              <span className="text-blue-500"> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
