import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { MdSearch } from "react-icons/md";

import { PaginatedTable } from "../../components";
import { collection, query, db, getDocs } from "../../services";

const DeleteTool = () => {
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
        let data;
        data = { ...doc.data() };
        data.id = doc.id;
        // console.log(data);
        myData.push(data);
      });
      // console.log("myData: ", myData);
      setTools(myData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // SEARCH
  const handleSearch = async (event) => {
    setSearchInput(event.target.value);
    // FILTER DATA
    const keys = ["category", "description", "title"];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) =>
          item[key].toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    };
    const result = await search(tools);
    // console.log("Result: ", result);
    setTools(result);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-md my-3">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 rounded-[8px] py-2 pr-8 pl-3 w-full focus:outline-none focus:shadow-outline"
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <MdSearch className="w-6 h-6 fill-current text-gray-500" />
          </div>
        </div>
      </div>
      {!isLoading && tools.length > 0 && (
        <div className="my-5">
          {/* <ToolsViewer tools={tools} itemsPerPage={10} /> */}
          <PaginatedTable tools={tools} itemsPerPage={10} />
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

export default DeleteTool;
