import React, { useContext, useEffect, useState } from "react";
import UploadSellerProducts from "../components/UploadSellerProducts";
import SummaryApi from "../common";
import SellerProductCard from "../components/SellerProductCard";
import Context from "../context";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";

const SellerAllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const { token } = useContext(Context);

  const fetchAllProduct = async () => {
    const response = await fetch(
      "https://reca.azurewebsites.net/api/v1/users/myProducts",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const dataResponse = await response.json();
    console.log(dataResponse);
    setFetchAgain(false);

    setAllProduct(dataResponse?.data?.products || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAgain]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/**all product */}
      <div className="flex items-center justify-between flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={product?._id}
              setFetchAgain={setFetchAgain}
            />
          );
        })}
      </div>

      {/**upload prouct component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
};

export default SellerAllProducts;
