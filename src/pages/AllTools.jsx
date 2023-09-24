import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import { Navbar, Search, AllTools as ToolsViewer } from "../components";
import { collection, query, db, getDocs } from "../services";

const AllTools = () => {
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTools();
  }, []);

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
      // console.log("myData: ", myData);
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
      {!isLoading && tools.length > 0 && (
        <div className="my-5">
          <ToolsViewer tools={tools} itemsPerPage={10} />
        </div>
      )}
      {!isLoading && tools.length === 0 && (
        <div className="flex justify-center items-center mt-4 w-full">
          There are no tools Available
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center mt-4 w-full">
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

export default AllTools;
