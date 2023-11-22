import React from "react";
import CatImages from "../catimage/cat";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <div className="w-full h-[30rem] bg-blue-200">
        <div className="bg h-screen flex flex-col">
          <Link to={"/mycollection"}>
            <button className="absolute top-4 right-4 bg-white text-black border rounded-lg w-[8rem] h-[2rem]">
              My collection
            </button>
          </Link>
          <div class="relative text-gray-600 mt-[14rem] max-sm:ml-0 max-md:ml-12 ml-[20rem] focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch />
            </span>
            <input
              type="text"
              class="py-2 pl-10 pr-4 block w-[30rem] h-[3rem] rounded-lg bg-white border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-400"
              placeholder="Search images..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <CatImages searchQuery={searchQuery} />
    </>
  );
}
export default Main;
