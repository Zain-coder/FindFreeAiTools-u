import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const TagsInput = ({ tags, setTags, inputValue, setInputValue }) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      addTag();
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const addTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 rounded p-2">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center bg-buttonRed text-white 
          px-2 py-1 rounded"
        >
          <span className="mr-1">{tag}</span>
          <button
            type="button"
            className="text-xs font-semibold focus:outline-none"
            onClick={() => handleTagRemove(tag)}
          >
            <RiCloseCircleLine className="w-5 h-5" />
          </button>
        </div>
      ))}
      <div className="flex flex-1">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          placeholder="Add tags..."
        />
        <button
          type="button"
          onClick={addTag}
          className="ml-2 px-3 py-1 bg-buttonRed text-white rounded focus:outline-none"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TagsInput;
