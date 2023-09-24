import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import { ListCard, Card } from "../../components";

const AllTools = ({ tools, itemsPerPage }) => {
  // const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = tools.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tools.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tools.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div
        className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 
        xl:px-24 md:px-12
      my-2 place-content-center place-items-center"
      >
        {currentItems.map((tool) => (
          <Card
            key={Math.random()}
            title={tool?.title}
            description={tool?.description}
            link={tool?.link}
            tags={tool?.tags}
            image={tool?.image}
            data={tool}
          />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center list-none mb-[5rem] md:text-[1.2rem] gap-[5px]
        mt-[3rem]
        "
        pageLinkClassName="py-[8px] md:px-[15px] px-[5px] cursor-pointer rounded-[3px] font-[400] hover:bg-buttonRed
        hover:text-white duration-300
        "
        previousLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-[3px] font-[400] hover:bg-buttonRed
        hover:text-white duration-300"
        nextLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-[3px] font-[400] hover:bg-buttonRed
        hover:text-white duration-300"
        activeLinkClassName="bg-buttonRed text-white"
      />
    </>
  );
};

export default AllTools;
