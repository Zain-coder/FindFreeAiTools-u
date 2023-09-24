import React from "react";
import "./Card.css";
import { CiShare1 } from "react-icons/ci";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { MdOutlineFavoriteBorder } from "react-icons/md";

// import { Test } from "../../assets";

// CONTEXT
import { useStateContext } from "../../context";

const Card = ({ title, description, link, tags, image, data }) => {
  const { user, setCopiedData } = useStateContext();
  const navigate = useNavigate();
  // console.log(user);

  const handleCopy = async (data) => {
    console.log(data);
    setCopiedData(data);
    toast.success("Copied!", {
      position: "top-right",
    });
  };

  return (
    <div
      className="
      xl:w-[350px] md:w-[300px] w-[330px] 
      cardShadow my-5 rounded-[10px]
    overflow-hidden
    "
    >
      <img
        src={image}
        alt="image"
        className="w-[100%] h-[180px] cursor-pointer"
        onClick={() => window.open(link)}
      />
      <div
        className={`bg-buttonRed
      cursor-pointer
      ${user?.role === "admin" ? "h-[300px]" : "h-[250px]"} 
      `}
      >
        <div
          className="flex items-center justify-between
        px-3 my-2
        "
        >
          <div className="flex items-center gap-3 my-3">
            <h1
              className="font-Helvetica
          text-[20px] text-white font-bold
          tracking-widest
          "
              onClick={() => {
                window.open(link);
              }}
            >
              {title}
            </h1>
            <CiShare1
              className="w-6 h-6 text-white"
              onClick={() => {
                window.open(link);
              }}
            />
          </div>
          {/* <div
            className="bg-black text-white
            px-3 rounded-[6px] text-[14px] py-1
          "
          >
            Pricing
          </div> */}
        </div>
        <p className="px-3 mb-2 text-white">
          {description.length > 150 ? description?.slice(0, 150) : description}
          ...
        </p>
        {/* <p className="px-3 mb-2">shortlist</p> */}
        <div className="flex gap-2 px-3">
          {tags?.map((tag) => (
            <p
              className="bg-black px-3 py-1
          text-white text-[14px] mb-4 mt-3
          rounded-[6px] flex
          justify-center cursor-pointer
          "
              onClick={() => navigate(`/tags/${tag}`)}
            >
              {tag}
            </p>
          ))}
        </div>
        {user?.role === "admin" && (
          <div
            className="flex justify-end items-center
          p-4
          "
          >
            <button
              className="flex justify-center items-center gap-2
            text-white bg-black px-2 py-1 rounded-[8px]
            hover:font-bold duration-300
            "
              onClick={() => handleCopy(data)}
            >
              Copy
              <HiOutlineClipboardCopy className="text-white h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
