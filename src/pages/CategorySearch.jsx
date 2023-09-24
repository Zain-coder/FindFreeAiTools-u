import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Navbar, Search, Loader, AllTools as ToolsViewer } from "../components";
import { collection, query, db, where, getDocs } from "../services";

const CategorySearch = () => {
  const location = useLocation();
  const { category } = useParams();
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTools();
  }, [location]);

  // GET TOOLS
  const getTools = async () => {
    setIsLoading(true);
    try {
      setTools([]);
      const myData = [];
      const q = query(
        collection(db, "tools"),
        where("category", "==", category)
      );

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
      setTools(myData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Search />
      {!isLoading && (
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
              AI Tools for:{" "}
            </p>
            <p
              className="text-black font-Helvetica
        font-semibold text-[18px]
        "
            >
              {category}
            </p>
          </div>
          <div className="my-5">
            <ToolsViewer tools={tools} itemsPerPage={15} />
          </div>
        </>
      )}
      {isLoading && <Loader title={`Getting AI Tools for: ${category}`} />}
    </>
  );
};

export default CategorySearch;
