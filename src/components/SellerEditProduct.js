import React, { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const SellerEditProduct = ({ onClose, productData, setFetchAgain }) => {
  const [data, setData] = useState({
    title: productData?.title,
    description: productData?.description,
    price: productData?.price,
    priceAfterDiscount: productData?.priceAfterDiscount,
  });
  const formData = objectToFormData(data);

  function objectToFormData(obj, formData = new FormData(), parentKey = "") {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (typeof value === "object" && !Array.isArray(value)) {
          objectToFormData(value, formData, formKey);
        } else if (Array.isArray(value)) {
          value.forEach((element) => {
            formData.append(formKey, element);
          });
        } else {
          formData.append(formKey, value);
        }
      }
    }

    return formData;
  }

  const { token } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setData((prev) => ({
        ...prev,
        [name]: { name: value },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${SummaryApi.updateProduct.url}/${productData._id}`,
        {
          method: SummaryApi.updateProduct.method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();

      if (responseData.data) {
        toast.success("Product has been updated successfully");
        onClose();
        setFetchAgain(true); 
      } else {
        toast.error(responseData.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">Product Name :</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product name"
            name="title"
            value={data.title}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="priceAfterDiscount" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="priceAfterDiscount"
            placeholder="Enter selling price"
            value={data.priceAfterDiscount}
            name="priceAfterDiscount"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerEditProduct;
