import React, { useState } from "react";
import { saveAs } from "file-saver";

import { FaSearch } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { removeImage } from "../store/slices/colllectionreducer";
function MyCollection() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const [isSettingDropdownOpen, setIsSettingDropdownOpen] = useState(null);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedTags, setSelectedTags] = useState({});
  const img = useSelector((state) => state.collection);
  const dispatch = useDispatch();

  const handleDelete = (imageId) => {
    dispatch(removeImage(imageId));
  };
  const toggleDropdown = (imageId, type) => {
    if (type === "settings") {
      setIsSettingDropdownOpen(
        isSettingDropdownOpen === imageId ? null : imageId
      );
    } else if (type === "tags") {
      setIsTagsDropdownOpen(isTagsDropdownOpen === imageId ? null : imageId);
    }
  };
  const handleChanges = (size, imageId) => {
    setSelectedSizes({
      ...selectedSizes,
      [imageId]: size,
    });
  };
  const download = (url) => {
    saveAs(url, "image.png");
  };
  const handleTagSelect = (tag, imageId) => {
    const currentSelectedTags = selectedTags[imageId] || [];
    const updatedTags = currentSelectedTags.includes(tag)
      ? currentSelectedTags.filter((t) => t !== tag)
      : [...currentSelectedTags, tag];
    setSelectedTags({
      ...selectedTags,
      [imageId]: updatedTags,
    });
  };
  const filteredCatData = searchQuery
    ? img.filter((cat) => {
        const tags = selectedTags[cat.id] || [];
        return tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : img;

  return (
    <div className="bg-purple-200 h-auto">
      <h1 className="font-bold text-5xl text-purple-800 justify-center text-center pt-10">
        My Collection Page
      </h1>
      <div class=" relative text-gray-600 mt-[5rem] max-sm:ml-0 max-md:ml-12 ml-[26rem] mb-16 focus-within:text-gray-400">
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
      <div className="container">
        {filteredCatData.map((cat) => (
          <div
            key={cat.id}
            className="box relative group overflow-hidden rounded-lg shadow-lg transform transition-transform"
          >
            <img
              src={cat.url}
              alt={`Cat ${cat.id}`}
              className={` image rounded-lg ${
                selectedSizes[cat.id] === "small"
                  ? "w-32 h-32"
                  : selectedSizes[cat.id] === "medium"
                  ? "w-64 h-64"
                  : "w-96 h-96"
              }`}
            />
            <div className="absolute inset-0 flex justify-center opacity-0 group-hover:opacity-100">
              <button
                className="bg-white w-auto h-[2rem] absolute border ml-[19rem] rounded-lg mt-2"
                onClick={() => toggleDropdown(cat.id, "settings")}
              >
                <IoMdSettings className="btn text-2xl font-bold text-black" />
              </button>
              {isSettingDropdownOpen === cat.id && (
                <div className="mt-12 ml-[15rem] left-0">
                  <div className="py-1 bg-white">
                    <button
                      onClick={() => handleChanges("small", cat.id)}
                      className="block px-4 py-2 text-black hover:text-yellow-500"
                    >
                      Small
                    </button>
                    <button
                      onClick={() => handleChanges("medium", cat.id)}
                      className="block px-4 py-2 text-black hover:text-yellow-500"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => handleChanges("large", cat.id)}
                      className="block px-4 py-2 text-black hover:text-yellow-500"
                    >
                      Large
                    </button>
                  </div>
                </div>
              )}

              <button
                className="bg-white h-[2rem] border rounded-lg w-[3rem] absolute bottom-2 left-2 items-center justify-center"
                onClick={() => toggleDropdown(cat.id, "tags")}
              >
                Tags
              </button>
              {isTagsDropdownOpen === cat.id && (
                <div className="absolute bottom-8 left-2">
                  <div className="py-1 bg-white">
                    <button
                      onClick={() => handleTagSelect("Cute", cat.id)}
                      className={`block px-4 py-2 text-black hover:text-yellow-500 ${
                        selectedTags[cat.id] &&
                        selectedTags[cat.id].includes("Cute")
                          ? "text-yellow-500"
                          : ""
                      }`}
                    >
                      Cute
                    </button>
                    <button
                      onClick={() => handleTagSelect("Happy", cat.id)}
                      className={`block px-4 py-2 text-black hover:text-yellow-500 ${
                        selectedTags[cat.id] &&
                        selectedTags[cat.id].includes("Happy")
                          ? "text-yellow-500"
                          : ""
                      }`}
                    >
                      Happy
                    </button>
                    <button
                      onClick={() => handleTagSelect("Angry", cat.id)}
                      className={`block px-4 py-2 text-black hover:text-yellow-500 ${
                        selectedTags[cat.id] &&
                        selectedTags[cat.id].includes("Angry")
                          ? "text-yellow-500"
                          : ""
                      }`}
                    >
                      Angry
                    </button>
                    <button
                      onClick={() => handleTagSelect("Pretty", cat.id)}
                      className={`block px-4 py-2 text-black hover:text-yellow-500 ${
                        selectedTags[cat.id] &&
                        selectedTags[cat.id].includes("Pretty")
                          ? "text-yellow-500"
                          : ""
                      }`}
                    >
                      Pretty
                    </button>
                  </div>
                  <button className="mt-2 text-black mb-4 bg-white">
                    Selected Tags:{" "}
                    {selectedTags[cat.id]
                      ? selectedTags[cat.id].join(", ")
                      : "None"}
                  </button>
                </div>
              )}
              <div className="flex absolute bottom-0 right-4 p-4">
                <button
                  className="bg-white w-auto border rounded-lg mr-[1rem]"
                  onClick={() => handleDelete(cat.id)}
                >
                  <AiFillDelete className="btn text-2xl font-bold text-red-500" />
                </button>
                <button className="bg-white w-auto h-auto border rounded-lg">
                  <GrDownload
                    className="btn text-2xl font-bold text-red-500"
                    onClick={() => download(cat.url)}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCollection;
