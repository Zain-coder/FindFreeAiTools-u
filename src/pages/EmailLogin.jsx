import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Navbar, TextInput } from "../components";
import {
  getAuth,
  db,
  signInWithEmailAndPassword,
  collection,
  query,
  where,
  getDocs,
} from "../services";

// CONTEXT
import { useStateContext } from "../context";

const EmailLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useStateContext();

  // FORM VALIDATION
  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email Must be Valid"
      ),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    // console.log(data);

    const email = data?.email?.toLowerCase();
    const password = data?.password;

    await loginUser(email, password);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // LOGIN USER
  const loginUser = async (email, password) => {
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const email = userCredential?.user?.email;
        toast.success("Logged In!", {
          position: "top-right",
        });
        await getUserData(email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        toast.error("Could not login", {
          position: "top-right",
        });
        setIsLoading(false);
      });
  };

  // GET USER DATA
  const getUserData = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      setIsLoading(false);
      toast.error("An Error has occured!", {
        position: "top-right",
      });
      return;
    }

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc?.id, " => ", doc.data());
      const user = doc?.data();
      setUser(doc?.data());
      localStorage.setItem("user", doc?.data());
      if (user?.role === "user") {
        reset();
        navigate("/");
      } else {
        reset();
        navigate("/");
      }
    });
  };

  return (
    <>
      <Navbar />
      <h1
        className="text-center
      font-Helvetica text-[26px]
      mt-8
      "
      >
        LogIn With your Email
      </h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md p-2">
        <div className="bg-white py-8 px-3 shadow sm:rounded-lg sm:px-10 rounded-[8px]">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                {/* <input
                      {...register("email")}
                      autoComplete="off"
                      className={inputStyles}
                      placeholder="test@test.com"
                    /> */}
                <TextInput
                  fieldName={"email"}
                  register={register}
                  autoComplete="off"
                  placeholder="Your Email"
                />
                {errors.email ? (
                  <div className="text-red-500 text-small">
                    {errors.email.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <div
                  className="
                flex items-center justify-end
                relative"
                >
                  <TextInput
                    fieldName={"password"}
                    register={register}
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                  />
                  {showPassword ? (
                    <MdVisibility
                      size={20}
                      color={"black"}
                      className="absolute
                      cursor-pointer ml-4"
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <MdVisibilityOff
                      size={20}
                      color={"black"}
                      className="absolute
                      cursor-pointer"
                      onClick={handleTogglePassword}
                    />
                  )}
                </div>
                {errors.password ? (
                  <div className="text-red-500 text-small">
                    {errors.password.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              {!isLoading && (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-buttonRed py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#b12013] buttonRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleSubmit(onSubmit)}
                >
                  Login
                </button>
              )}
              {isLoading && (
                <button
                  disabled=""
                  type="submit"
                  className="flex w-full justify-center items-center gap-2 rounded-md bg-buttonRed py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#b12013] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Logging In...
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              )}
            </div>

            {/* <div
              className="font-Helvetica
            text-gray-500
            "
            >
              Don't have an account?{" "}
              <span
                className="text-buttonRed
              hover:text-[#b12013] hover:underline
              cursor-pointer
              "
                onClick={() => navigate("/signup")}
              >
                Create Here!
              </span>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailLogin;
