import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ title }) => {
  return (
    <div
      className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] 
    flex items-center justify-center flex-col"
    >
      <p className="mt-[20px] font-Helvetica font-bold text-[20px] text-white text-center">
        {title} <br /> Please wait...
      </p>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#DB4437"
        visible={true}
      />
    </div>
  );
};

export default Loader;
