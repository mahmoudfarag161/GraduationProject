import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminCategoryCard from "../components/AdminCategoryCard";
import UploadCategory from "../components/UploadCategory";

function AllCategories() {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [fetctAgain, setFetchAgain] = useState(false);

  const fetchAllCategories = async () => {
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setFetchAgain(false);

    setAllCategory(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllCategories();
  }, [fetctAgain]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Category</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadCategory(true)}
        >
          Upload Category
        </button>
      </div>

      {/**all categories */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allCategory.map((product, index) => {
          return (
            <AdminCategoryCard
              data={product}
              key={product?._id}
              setFetchAgain={setFetchAgain}
            />
          );
        })}
      </div>

      {/**upload category component */}
      {openUploadCategory && (
        <UploadCategory
          onClose={() => setOpenUploadCategory(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default AllCategories;
