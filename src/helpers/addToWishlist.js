import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToWishlist = async (e, id, token) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(SummaryApi.addToWishlistProduct.url, {
    method: SummaryApi.addToWishlistProduct.method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId: id}),
  });
  console.log(response)

  const responseData = await response.json();
  console.log(responseData)

  if (responseData.status === "success") {
    toast.success("product added to wishlist");
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default addToWishlist;