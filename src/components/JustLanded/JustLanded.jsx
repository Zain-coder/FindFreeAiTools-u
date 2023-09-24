import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import { dummyFeatured } from "../../constants";
import Card from "../Card/Card";
import { collection, query, db, getDocs } from "../../services";

const JustLanded = () => {
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
      let latesttools = reverseArray(myData);
      const latest = latesttools.slice(15, 30);
      setTools(latest);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // REVERSE ARRAY
  function reverseArray(arr) {
    // Make a copy of the original array
    const copyArr = [...arr];
    // Loop through half of the array and swap elements
    for (let i = 0; i < Math.floor(copyArr.length / 2); i++) {
      const temp = copyArr[i];
      copyArr[i] = copyArr[copyArr.length - 1 - i];
      copyArr[copyArr.length - 1 - i] = temp;
    }
    // Return the reversed array
    return copyArr;
  }

  return (
    <div>
      <h1
        className="font-Helvetica md:ml-24
      md:text-[36px] font-[600] ml-2 md:text-left
      text-center text-[28px]
      "
      >
        🛬 Newest
      </h1>
      {!isLoading && (
        <div
          className="grid lg:grid-cols-3 md:grid-cols-2 
        xl:mx-20 md:px-12
      my-2 place-content-center
      "
        >
          {tools?.map((items) => (
            <Card
              key={Math.random()}
              title={items?.title}
              description={items?.description}
              link={items?.link}
              tags={items?.tags}
              image={items?.image}
              data={items}
            />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#DB4437"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default JustLanded;
