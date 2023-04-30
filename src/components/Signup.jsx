import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "./firebase/firebase";
import swal from "sweetalert";
import { usersRef } from "./firebase/firebase";
import { addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const auth = getAuth(app);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    setLoader(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOTP = async () => {
    try {
      setLoader(true);
      confirmationResult.confirm(OTP).then((result) => {
        uploadData();

        swal({
          text: "Successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/login");
        setLoader(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex mt-4 justify-center flex-col items-center">
      <h1 className="my-3 text-4xl font-bold">SignUp</h1>
      {otpSent ? (
        <>
          <div class="p-2">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-white-500">
                Enter OTP
              </label>
              <input
                id="mobile"
                name="mobile"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                c
              />
            </div>
            <div class="p-2 mt-3">
              <button
                class="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={verifyOTP}
              >
                {loader ? (
                  <TailSpin height={25} color="white" />
                ) : (
                  " Confirm OTP"
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="flex  flex-col w-full  md:w-4/12 mt-3  ">
            <div class="p-2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-white-500">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  c
                />
              </div>
            </div>
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="p-2 mt-3">
              <button
                className="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={requestOtp}
              >
                {loader ? (
                  <TailSpin height={25} color="white" />
                ) : (
                  "Request OTP"
                )}
              </button>
            </div>
            <div className="p-2 mt-3 flex justify-center">
              <p>
                Alredy have an account
                <Link to={"/login"}>
                  <span className="text-blue-500"> Login</span>
                </Link>
              </p>
            </div>
          </div>
          <div id="sign-in-button"></div>
        </>
      )}
    </div>
  );
};

export default Signup;
