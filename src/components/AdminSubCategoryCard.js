import React, { useContext, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import SummaryApi from "../common";
import Context from "../context";
import { toast } from "react-toastify";
import AdminEditSubCategory from "./AdminEditSubCategory";

function AdminSubCategoryCard({ data, setFetchAgain }) {
  const [editSubCategory, setEditSubCategory] = useState(false);
  const context = useContext(Context);
  const deleteSubCategory = async (id) => {
    const response = await fetch(`${SummaryApi.deleteSubCategory.url}/${id}`, {
      method: SummaryApi.deleteSubCategory.method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.token}`,
      },
    });

    if (response.status === 204) {
      toast.success("subcategory deleted successfully");
      setFetchAgain(true);
    }
  };
  console.log(data);

  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.image}
            alt={data?.name}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.name}</h1>

        <div>
          <div className=" flex justify-between">
            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditSubCategory(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="w-fit text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
              onClick={() => deleteSubCategory(data?._id)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editSubCategory && (
        <AdminEditSubCategory
          subCategoryData={data}
          onClose={() => setEditSubCategory(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default AdminSubCategoryCard;
