import React from "react";

import { Navbar, Search } from "../components";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <Search />
      <div
        className="flex justify-center items-center w-full my-12
    text-buttonRed font-Helvetica text-[30px]
    "
      >
        404-NOT FOUND!
      </div>
    </>
  );
};

export default NotFound;
