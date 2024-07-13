import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf, FaStar as FaStarFilled } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    title: "",
    slug: "",
    category: { name: "" },
    images: [],
    description: "",
    price: "",
    priceAfterDiscount: "",
  });
  const { token, userId, fetchUserAddToCart, userRole } = useContext(Context);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const imagesListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [userReview, setUserReview] = useState(null);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(
      `${SummaryApi.productDetails.url}/${params?.id}`,
      {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json",
        },
      }
    );
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.images[0]);
  };

  const fetchReviews = async () => {
    const response = await fetch(
      `${SummaryApi.reviews.url}?product=${params?.id}`,
      {
        method: 'GET',
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const dataResponse = await response.json();
    setReviews(dataResponse.data);

    const userReview = dataResponse.data.find(review => review.user._id === userId);
    setUserReview(userReview);
  };

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, token);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id, token);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const handleReviewSubmit = async (title, ratings) => {
    const response = await fetch(`${SummaryApi.reviews.url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        ratings,
        product: params?.id,
        user: userId,
      }),
    });

    if (response.ok) {
      const newReviewData = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReviewData.data]);
      setNewReview('');
      setRating(0);
      setUserReview(newReviewData.data);
    } else {
      console.error('Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const response = await fetch(`${SummaryApi.reviews.url}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      setUserReview(null);
    } else {
      console.error('Failed to delete review');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/***product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt={data.title}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/**product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {imagesListLoading.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={"loadingImage" + index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.images?.map((imgURL, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      alt={index}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/***product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
              <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
            </div>
          </div>
        ) : (
          <div className="grid gap-1 w-full">
            <p className="capitalize text-red-600">{data?.slug}</p>
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.title}</h2>
            <p className="capitalize text-slate-400">
              Category : {data?.category?.name}
            </p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStarHalf className="text-yellow-500" />
              <span className="text-slate-500">(4.5)</span>
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(data.priceAfterDiscount)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <div className="flex my-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => handleReviewSubmit(newReview, rating)}
          >
            Submit Review
          </button>
        </div>
        <div className="mt-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border border-gray-300 rounded my-2"
            >
              <div className="flex">
                {[...Array(review.ratings)].map((_, index) => (
                  <FaStarFilled key={index} className="text-yellow-500" />
                ))}
              </div>
              <p className="mt-2">{review.title}</p>
              <p className="text-sm text-gray-500">By: {review.user.name}</p>
              {userId === review.user._id && (
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 mt-2"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
