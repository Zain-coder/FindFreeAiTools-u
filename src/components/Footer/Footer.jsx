import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-[1px] bg-slate-300"></div>
      <div
        className="my-6
      flex justify-center items-center
      w-full text-[12px] md:text-[16px]
      "
      >
        © Copyright
        <span
          className="font-bold
        mx-2
        "
        >
          FindFreeAiTools
        </span>
        All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
