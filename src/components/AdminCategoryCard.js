import React, { useContext, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import SummaryApi from "../common";
import Context from "../context";
import { toast } from "react-toastify";
import AdminEditCategory from "./AdminEditCategory";

function AdminCategoryCard({ data, setFetchAgain }) {
  const [editCategory, setEditCategory] = useState(false);
  const context = useContext(Context);
  const deleteCategory = async (id) => {
    const response = await fetch(`${SummaryApi.deleteCategory.url}/${id}`, {
      method: SummaryApi.deleteCategory.method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.token}`,
      },
    });

    if (response.status === 204) {
      toast.success("category deleted successfully");
      setFetchAgain(true);
    }
  };

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
              onClick={() => setEditCategory(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="w-fit text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
              onClick={() => deleteCategory(data?._id)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editCategory && (
        <AdminEditCategory
          categoryData={data}
          onClose={() => setEditCategory(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default AdminCategoryCard;
