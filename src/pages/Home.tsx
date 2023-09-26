import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import useSearch from "../composables/useSearch";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("relevant");
  const [selectedColor, setSelectedColor] = useState("");
  const { photos, searchPhotos, loading, failed, totalPages } = useSearch();

  const colorOptions = [
    { value: "", label: "All Colors" },
    { value: "black_and_white", label: "Black/White" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "yellow", label: "Yellow" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "purple", label: "Purple" },
    { value: "magenta", label: "Magenta" },
    { value: "green", label: "Green" },
    { value: "teal", label: "Teal" },
    { value: "blue", label: "Blue" },
  ];

  useEffect(() => {
    searchPhotos(searchQuery, currentPage, selectedColor, orderBy);
  }, [searchQuery, currentPage, selectedColor, orderBy]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };


  return (
    <div className="container mx-auto min-h-[100vh] py-8 px-4">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl">Search your photos</h1>
        <Search onSearch={handleSearch} />
        <p>Search Query: {searchQuery}</p>
        {!loading && !failed && photos.length > 0 && (
          <div className="flex-col sm:flex-row justify-center flex gap-4">
            <Dropdown
              label="Order By:"
              id="order-by"
              options={[
                { value: "relevant", label: "Relevant" },
                { value: "latest", label: "Latest" },
              ]}
              value={orderBy}
              onChange={(e) => handleDropdownChange(e, setOrderBy)}
            />
            <Dropdown
              label="Color:"
              id="color"
              options={colorOptions}
              value={selectedColor}
              onChange={(e) => handleDropdownChange(e, setSelectedColor)}
            />
          </div>
        )}
        {photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {loading ? (
              <div className={`col-span-5`}>Loading...</div>
            ) : failed ? (
              <div className={`col-span-5 text-red-500`}>Failed to fetch photos.</div>
            ) : photos.length === 0 ? (
              <div className={`col-span-5`}>No photos found.</div>
            ) : (
              photos.map((photo, index) => (
                <Card key={index} photo={photo} />
              ))
            )}
          </div>
        )}
        {totalPages > 1 && photos.length > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
