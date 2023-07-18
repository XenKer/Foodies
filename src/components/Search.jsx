import React, { useState } from "react";

const Search = ({ foodItems, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredItems = foodItems?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    onSearch(filteredItems);
  };

  return (
    <div className="w-full flex items-center justify-center my-4">
      <input
        type="text"
        placeholder="Search for food..."
        value={searchTerm}
        onChange={handleSearch}
        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;
