import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { GrDownload } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { collectiondata } from "../store/slices/colllectionreducer";
import ImageUploader from "../uploadbutton/upload";
function CatImages({ searchQuery }) {
  const [catData, setCatData] = useState([]);
  const [isSettingDropdownOpen, setIsSettingDropdownOpen] = useState(null);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedTags, setSelectedTags] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCatData(data);
        setSelectedSizes({});
      } catch (error) {
        console.error("Error fetching cat images:", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = (imageId) => {
    const updatedCatData = catData.filter((cat) => cat.id !== imageId);

    setCatData(updatedCatData);
  };
  const addtocollection = (imageId) => {
    const result = catData.find((d) => d.id === imageId);
    dispatch(collectiondata(result));
  };
  const handleImageUpload = (selectedImage) => {
    // Update catData state with the new image
    setCatData((prevCatData) => [
      ...prevCatData,
      { id: Date.now(), url: selectedImage },
    ]);
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
    ? catData.filter((cat) => {
        const tags = selectedTags[cat.id] || [];
        return tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : catData;
  return (
    <>
      <ImageUploader onImageUpload={handleImageUpload} />
      <div className="container mx-auto h-auto p-4">
        <div className="">
          {filteredCatData.map((cat) => (
            <div
              key={cat.id}
              className={`box relative group overflow-hidden  rounded-lg  transform transition-transform  `}
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
                  className="bg-white w-auto h-[2rem] absolute border ml-[12rem] rounded-lg mt-2"
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
                  className="bg-white h-[2rem] border rounded-lg w-[3rem] absolute top-2 right-8 items-center justify-center"
                  onClick={() => addtocollection(cat.id)}
                >
                  Add
                </button>
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
    </>
  );
}
export default CatImages;
