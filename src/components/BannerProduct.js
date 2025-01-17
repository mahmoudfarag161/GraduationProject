import React, { useContext, useEffect, useRef, useState } from "react";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import Star from "./Star";
import addToCart from "../helpers/addToCart";
import addToWishlist from "../helpers/addToWishlist";
import Context from "../context";

const BannerProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const stars = new Array(5).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddToCart, token, setWishlistNum } = useContext(Context);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, token);
    fetchUserAddToCart();
  };
  const handleAddToWishlist = async (e, id) => {
    await addToWishlist(e, id, token, setWishlistNum);
  };

  useEffect(function () {
    async function getBestSeller() {
      setLoading(true);
      const response = await fetch(
        "https://ronolos-recommender-system.hf.space/api/best_seller"
      );
      const dataReponse = await response.json();
      setData(dataReponse);
      setLoading(false);
    }
    getBestSeller();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      {data?.length !== 0 && (
        <h2 className="text-2xl font-semibold py-4">best_seller</h2>
      )}

      <div
        className="flex justify-between items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {data?.length >= 5 && (
          <>
            <button
              className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
              onClick={scrollLeft}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
              onClick={scrollRight}
            >
              <FaAngleRight />
            </button>
          </>
        )}

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    </div>
                    <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  key={index}
                  to={"product/" + product?.product_id}
                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      alt={product?.title}
                      src={product?.images[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.title}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category?.name}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.priceAfterDiscount)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <div className=" flex justify-start my-1">
                      {stars.map(function (el, index) {
                        return (
                          <Star
                            key={index}
                            starNum={index + 1}
                            rating={product?.ratingsAverage}
                          />
                        );
                      })}
                    </div>
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?.product_id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full"
                      onClick={(e) =>
                        handleAddToWishlist(e, product?.product_id)
                      }
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default BannerProduct;
