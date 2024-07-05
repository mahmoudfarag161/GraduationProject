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

const AdminEditProduct = ({ onClose, productData, setFetchAgain }) => {
  const [data, setData] = useState({
    title: productData?.title,
    // category: productData?.category,
    description: productData?.description,
    price: productData?.price,
    priceAfterDiscount: productData?.priceAfterDiscount,
  });
  const formData = objectToFormData(data);
  // ...productData,
  // images: productData?.images || [],
  // imageCover: productData?.imageCover,

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

  // const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  // const [fullScreenImage, setFullScreenImage] = useState("");
  const { token } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setData((preve) => {
        return {
          ...preve,
          [name]: { name: value },
        };
      });
      return;
    }

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // const handleUploadProduct = async (e) => {
  //   const file = e.target.files[0];
  //   const uploadImageCloudinary = await uploadImage(file);

  //   setData((preve) => {
  //     return {
  //       ...preve,
  //       images: [...preve.images, uploadImageCloudinary.url],
  //     };
  //   });
  // };

  // const handleDeleteimages = async (index) => {
  //   console.log("image index", index);

  //   const newimages = [...data.images];
  //   newimages.splice(index, 1);

  //   setData((preve) => {
  //     return {
  //       ...preve,
  //       images: [...newimages],
  //     };
  //   });
  // };

  {
    /**upload product */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    console.log(responseData.data._id);

    if (responseData.data) {
      toast.success("produce has been updated");
      onClose();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
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
            placeholder="enter product name"
            name="title"
            value={data.title}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          {/* 
          <label htmlFor="slug" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="slug"
            placeholder="enter brand name"
            value={data.slug}
            name="slug"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          /> */}

          {/* <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            required
            value={data.category.name}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select> */}

          {/* <label htmlFor="images" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.images[0] ? (
              <div className="flex items-center gap-2">
                {data.images.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteimages(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div> */}

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="enter price"
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
            placeholder="enter selling price"
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
            placeholder="enter product description"
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

      {/***display image full screen */}
      {/* {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )} */}
    </div>
  );
};

export default AdminEditProduct;
