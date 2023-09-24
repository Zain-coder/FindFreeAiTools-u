import React from "react";
import { CiShare1 } from "react-icons/ci";
import "./ListCard.css";
import { useNavigate } from "react-router-dom";

// import { Test } from "../../assets";

const ListCard = ({ title, description, link, tags, image }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-center mt-3
    mb-6
    "
    >
      <div
        className="bg-buttonRed
  flex cardShadow md:flex-row flex-col
  md:w-[80%] w-[90%] rounded-[8px] py-2
  cursor-pointer
  "
      >
        <img
          src={image}
          alt="image"
          className="md:w-[250px] md:h-[170px] ml-2
        rounded-[8px] w-[95%] h-[200px] cursor-pointer
        "
          onClick={() => window.open(link)}
        />
        <div className="mx-4">
          <div className="flex items-center">
            <h1
              className="font-bold font-Helvetica
            text-[30px] text-white cursor-pointer
            md:mt-0 mt-4
            "
              onClick={() => {
                window.open(link);
              }}
            >
              {title}
            </h1>
            <CiShare1
              size={30}
              color="white"
              className="ml-3 cursor-pointer"
              onClick={() => {
                window.open(link);
              }}
            />
          </div>
          <p className="text-white mb-4 mt-2">
            {description?.slice(0, 150)}...
          </p>
          <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default ListCard;
