import React, { useContext, useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import SellerEditProduct from "./SellerEditProduct"; 
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";
import Context from "../context";
import { toast } from "react-toastify";

const SellerProductCard = ({ data, setFetchAgain, fetchSpecificProduct, updateSpecificProduct, deleteSpecificProduct }) => {
  const [editProduct, setEditProduct] = useState(false);
  const context = useContext(Context);

  const deleteProduct = async (id) => {
    const response = await fetch(`https://reca.azurewebsites.net/api/v1/products/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.token}`,
      },
    });

    if (response.status === 204) {
      toast.success("Product deleted successfully");
      setFetchAgain(true);
    } else {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.imageCover}
            alt={data.title}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.title}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.priceAfterDiscount)}
          </p>

          <div className="flex justify-between">
            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="w-fit text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
              onClick={() => deleteProduct(data?._id)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <SellerEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
};

export default SellerProductCard;
