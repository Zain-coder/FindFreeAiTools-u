import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { auth, provider, signInWithPopup } from "../services";
import { Navbar } from "../components";

// CONTEXT
import { useStateContext } from "../context";

const Login = () => {
  const { setUser, user } = useStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data?.user);
      // console.log(data?.user);
      localStorage.setItem("user", data?.user);
      navigate("/");
    });
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <h1
        className="text-center
      font-Helvetica text-[26px]
      mt-12
      "
      >
        Create an account or Log in below
      </h1>
      <div
        className="flex
      justify-center items-center
      "
        onClick={handleClick}
      >
        <button
          className="
        my-4 buttonShadow
        py-2 w-[220px]
        flex justify-start items-center
        "
          onClick={handleClick}
        >
          <span className="mx-3">
            <FcGoogle className="w-6 h-6" />
          </span>
          <span
            className="font-[600]
          text-gray-500
          "
          >
            Google
          </span>
        </button>
      </div>
      <div
        className="flex
      justify-center items-center
      "
        onClick={() => {
          navigate("/emaillogin");
        }}
      >
        <button
          className="
        buttonShadow
        py-2 w-[220px]
        bg-buttonRed
        flex justify-start items-center
        "
          onClick={() => {
            navigate("/emaillogin");
          }}
        >
          <span className="mx-3">
            <MdEmail className="w-6 h-6 text-white" />
          </span>
          <span
            className="font-[600]
          text-white
          "
          >
            Email
          </span>
        </button>
      </div>
      <div
        className="flex
        justify-center items-center
      "
      >
        <div
          className="w-[300px] mt-5 text-gray-400
        text-[14px]
        "
        >
          By continuing, you are indicating that you accept our
          <span
            className="text-indigo-600
          hover:underline cursor-pointer

          "
          >
            {" "}
            Terms of Service{" "}
          </span>
          and
          <span
            className="text-indigo-600
          hover:underline cursor-pointer
          "
          >
            {" "}
            Privacy Policy{" "}
          </span>
          .
        </div>
      </div>
    </>
  );
};

export default Login;
