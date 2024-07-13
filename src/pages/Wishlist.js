import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const context = useContext(Context);
  const loadingWishlist = new Array(4).fill(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.addToWishlistProductView.url, {
      method: SummaryApi.addToWishlistProductView.method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.token}`,
      },
    });
    
    const responseData = await response.json();

    setLoading(false);
    console.log(responseData);
    if (responseData.data) {
      setData(responseData.data);
      setProductId(responseData.data._id);
      console.log(productId);
    }
    if (responseData.status === "fail") {
      setData([]);
    }
  };

  // const handleLoading = async () => {
  //   await fetchData();
  // };

  useEffect(function () {
    fetchData()
  }
  , []);


  const deleteWishlistProduct = async (id) => {
    const response = await fetch(`${SummaryApi.deleteWishlistProduct.url}/${id}`, {
      method: SummaryApi.deleteWishlistProduct.method,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.token}`,
      },
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      fetchData();
      context.fetchUserAddToCart();
    }
  };
  async function handleClearWishlist() {
    const response = await fetch(SummaryApi.clearWishlistProduct.url, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    });
    console.log(response);

    if (response.status === 204) {
      fetchData();
      context.fetchUserAddToCart();
    }
  }

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingWishlist?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Wishlist Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Wishlist Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        alt={product?.title}
                        src={product?.imageCover}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteWishlistProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.title}
                      </h2>
                      {/* <p className="capitalize text-slate-500">
                        {product?.category}
                      </p> */}
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.price)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.price * product?.quantity
                          )}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              
              <button
                onClick={handleClearWishlist}
                className=" bg-blue-600 p-2 text-white w-full mt-2"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
