import React from "react";
import { GrTwitter } from "react-icons/gr";

import { Fire } from "../../assets";

const Banner = () => {
  return (
    <div
      className="flex flex-col justify-center items-center
      my-6 w-[100%]"
    >
      <div
        className="flex justify-start items-center
        flex-col md:flex-row
        bg-red-100 xl:w-[80%] w-[90%] py-4
      "
      >
        <img src={Fire} alt="fire" className="w-12 h-12 mx-5" />
        <div
          className="flex flex-col justify-center items-start
          xl:w-[70%] lg:w-[65%] w-[55%]
        "
        >
          <p
            className="font-Helvetica font-[600] text-[30px]
          mb-3
          "
          >
            Create your account, save tools & stay updated
          </p>
          <p className="text-[20px]">
            Receive a weekly digest of our handpicked top tools.
          </p>
          <p className="text-gray-500 ">Unsubscribe anytime</p>
        </div>
        <button
          className="bg-red-700
        px-5 py-4 rounded-[8px] font-Helvetica
        text-white hover:text-red-500 duration-300
        "
        >
          CREATE MY ACCOUNT
        </button>
      </div>
      <div
        className="flex justify-center items-center gap-2
      bg-red-100 xl:w-[80%] w-[90%] pb-4
      "
      >
        <GrTwitter className="text-red-700" />
        <p
          className="text-red-700 hover:text-red-500 duration-300
        cursor-pointer
        "
        >
          Twitter
        </p>
      </div>
    </div>
  );
};

export default Banner;
