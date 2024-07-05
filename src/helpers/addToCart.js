import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id, token) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(SummaryApi.addToCartProduct.url, {
    method: SummaryApi.addToCartProduct.method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId: id, colorL: "red" }),
  });

  const responseData = await response.json();

  if (responseData.status === "success") {
    toast.success("product added to cart");
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default addToCart;
