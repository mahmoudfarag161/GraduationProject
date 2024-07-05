import React, { useContext, useEffect, useRef, useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import SummaryApi from "../common";
import Star from "./Star";

const HorizontalCardProduct = ({ subCategoryId, heading }) => {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const stars = new Array(5).fill(null);

  const scrollElement = useRef();

  const { fetchUserAddToCart, token } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, token);
    fetchUserAddToCart();
  };

  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch(
      `${SummaryApi.allProduct.url}?subcategory=${subCategoryId}`
    );
    const categoryProduct = await res.json();
    setLoading(false);

    setData(categoryProduct?.data);
    setRating(categoryProduct.ratingsQuantity);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      {data?.length !== 0 && (
        <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      )}

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
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
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  key={product?._id}
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[350px] max-w-[280px] md:max-w-[350px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product?.images[0]}
                      alt={product?._id}
                      className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-3 grid">
                    <h2 className="font-medium  text-base md:text-lg   text-black">
                      {product?.title}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category.name}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium text-xs">
                        {displayINRCurrency(product?.priceAfterDiscount)}
                      </p>
                      <p className="text-slate-500 line-through text-xs">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <div className=" flex justify-start my-1">
                      {stars.map(function (el, index) {
                        return (
                          <Star
                            key={index}
                            starNum={index + 1}
                            rating={rating / 2}
                          />
                        );
                      })}
                    </div>

                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white mt-1 px-3 py-0.5 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
