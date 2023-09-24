import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import {
  Navbar,
  Search as SearchComponent,
  ListCard,
  AllTools as ToolsViewer,
} from "../components";
import { collection, query, db, getDocs } from "../services";

const TagsSearch = () => {
  const location = useLocation();
  const { input } = useParams();
  // console.log("Search: ", input);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTools();
  }, [location]);

  // GET TOOLS
  const getTools = async () => {
    setIsLoading(true);
    try {
      setTools([]);
      const myData = [];
      const q = query(collection(db, "tools"));

      const querySnapshot = await getDocs(q);

      if (querySnapshot?.empty) {
        setIsLoading(false);
        setTools([]);
        return;
      }

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        myData.push(doc?.data());
      });
      // let latesttools = reverseArray(myData);
      // const latest = myData.slice(0, 12);
      // console.log("myData: ", myData);

      // FILTER DATA
      const keys = ["category", "description", "title", "tags"];
      const search = (data) => {
        // return data.filter((item) =>
        //   keys.some((key) =>
        //     item[key].toLowerCase().includes(input.toLowerCase())
        //   )
        // );
        return data.filter((item) =>
          item.tags.some((tag) =>
            tag.toLowerCase().includes(input.toLowerCase())
          )
        );
      };
      const result = await search(myData);
      // console.log("Result: ", result);
      setTools(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SearchComponent />
      {!isLoading && tools.length > 0 && (
        <>
          <div
            className="flex md:justify-start items-center
      w-full gap-2 justify-center
      "
          >
            <p
              className="text-gray-700
            md:ml-36  
            "
            >
              Search Results for:{" "}
            </p>
            <p
              className="text-black font-Helvetica
        font-semibold text-[18px]
        "
            >
              {input}
            </p>
          </div>
          <div className="my-5">
            <ToolsViewer tools={tools} itemsPerPage={15} />
          </div>
        </>
      )}
      {!isLoading && tools.length === 0 && (
        <div
          className="flex justify-start items-center
      w-full gap-2
      "
        >
          <p
            className="text-gray-700
            ml-36
            "
          >
            No Result for:{" "}
          </p>
          <p
            className="text-black font-Helvetica
        font-semibold text-[18px]
        "
          >
            {input}
          </p>
        </div>
      )}
      {isLoading && (
        <div
          className="flex justify-center items-center
        w-full
        "
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#DB4437"
            visible={true}
          />
        </div>
      )}
    </>
  );
};

export default TagsSearch;
