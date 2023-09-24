import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  Search,
  Featured,
  Banner,
  JustLanded,
  Footer,
} from "../components";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Search />
      <Featured />
      {/* <Banner /> */}
      <JustLanded />
      <div
        className="flex justify-center items-center
      my-4
      "
        onClick={() => navigate("/alltools")}
      >
        <button
          className="bg-buttonRed
        px-12 py-4 rounded-[6px]
        text-white font-Helvetica
        hover:font-bold duration-500 
        "
        >
          EXPLORE ALL TOOLS
        </button>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
