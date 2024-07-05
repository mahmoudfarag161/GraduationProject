import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminSubCategoryCard from "../components/AdminSubCategoryCard";
import UploadSubCategory from "../components/UploadSubCategory";

function AllSubCategories() {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [fetctAgain, setFetchAgain] = useState(false);

  const fetchAllSubCategories = async () => {
    const response = await fetch(SummaryApi.getAllSubCategories.url);
    const dataResponse = await response.json();
    setFetchAgain(false);

    setAllSubCategory(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllSubCategories();
  }, [fetctAgain]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All SubCategory</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadSubCategory(true)}
        >
          Upload SubCategory
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allSubCategory.map((product, index) => {
          return (
            <AdminSubCategoryCard
              data={product}
              key={product?._id}
              setFetchAgain={setFetchAgain}
            />
          );
        })}
      </div>

      {openUploadSubCategory && (
        <UploadSubCategory
          onClose={() => setOpenUploadSubCategory(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default AllSubCategories;
