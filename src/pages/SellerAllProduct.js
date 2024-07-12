import React, { useEffect, useState } from "react";
import UploadSellerProducts from "../components/UploadSellerProducts"; 
import SummaryApi from "../common";
import SellerProductCard from "../components/SellerProductCard"; 

const SellerAllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setFetchAgain(false);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAgain]);

  const fetchSpecificProduct = async (productId) => {
    const response = await fetch(`https://reca.azurewebsites.net/api/v1/products/${productId}`);
    const dataResponse = await response.json();
    setSelectedProduct(dataResponse.data);
  };

  const updateSpecificProduct = async (productId, updatedData) => {
    const response = await fetch(`https://reca.azurewebsites.net/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const dataResponse = await response.json();
    setFetchAgain(true);
    return dataResponse;
  };

  const deleteSpecificProduct = async (productId) => {
    await fetch(`https://reca.azurewebsites.net/api/v1/products/${productId}`, {
      method: 'DELETE',
    });
    setFetchAgain(true);
  };

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Seller All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product) => {
          return (
            <SellerProductCard
              data={product}
              key={product?._id}
              setFetchAgain={setFetchAgain}
              fetchSpecificProduct={fetchSpecificProduct}
              updateSpecificProduct={updateSpecificProduct}
              deleteSpecificProduct={deleteSpecificProduct}
            />
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadSellerProducts
          onClose={() => setOpenUploadProduct(false)}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
};

export default SellerAllProducts;
