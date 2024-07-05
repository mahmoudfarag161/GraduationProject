const SummaryApi = {
  signUP: {
    url: "https://reca.azurewebsites.net/api/v1/auth/signup",
    method: "post",
  },
  signIn: {
    url: "https://reca.azurewebsites.net/api/v1/auth/login",
    method: "post",
  },
  current_user: {
    url: "https://reca.azurewebsites.net/api/v1/users/getMe",
    method: "get",
  },

  allUser: {
    url: "https://reca.azurewebsites.net/api/v1/users",
    method: "get",
  },
  updateUser: {
    url: "https://reca.azurewebsites.net/api/v1/users",
    method: "put",
  },
  uploadProduct: {
    url: "https://reca.azurewebsites.net/api/v1/products",
    method: "post",
  },
  allProduct: {
    url: "https://reca.azurewebsites.net/api/v1/products",
    method: "get",
  },
  updateProduct: {
    url: "https://reca.azurewebsites.net/api/v1/products",
    method: "PUT",
  },
  deleteProduct: {
    url: "https://reca.azurewebsites.net/api/v1/products",
    method: "delete",
  },
  productDetails: {
    url: "https://reca.azurewebsites.net/api/v1/products",
    method: "get",
  },
  categoryProduct: {
    url: "https://reca.azurewebsites.net/api/v1/categories",
    method: "get",
  },
  deleteCategory: {
    url: "https://reca.azurewebsites.net/api/v1/categories",
    method: "delete",
  },
  uploadCategory: {
    url: "https://reca.azurewebsites.net/api/v1/categories",
    method: "post",
  },
  updateCategory: {
    url: "https://reca.azurewebsites.net/api/v1/categories",
    method: "put",
  },
  getAllSubCategories: {
    url: "https://reca.azurewebsites.net/api/v1/subcategories",
    method: "get",
  },
  createSubCategory: {
    url: "https://reca.azurewebsites.net/api/v1/subcategories",
    method: "post",
  },
  deleteSubCategory: {
    url: "https://reca.azurewebsites.net/api/v1/subcategories",
    method: "delete",
  },
  updateSubCategory: {
    url: "https://reca.azurewebsites.net/api/v1/subcategories",
    method: "put",
  },

  addToCartProduct: {
    url: "https://reca.azurewebsites.net/api/v1/cart",
    method: "post",
  },

  addToCartProductView: {
    url: "https://reca.azurewebsites.net/api/v1/cart",
    method: "get",
  },
  updateCartProduct: {
    url: "https://reca.azurewebsites.net/api/v1/cart",
    method: "put",
  },
  deleteCartProduct: {
    url: "https://reca.azurewebsites.net/api/v1/cart",
    method: "delete",
  },
  clearCartProduct: {
    url: "https://reca.azurewebsites.net/api/v1/cart",
    method: "delete",
  },

  searchProduct: {
    url: "https://reca.azurewebsites.net/api/v1/products",
    method: "get",
  },

  createCheckoutSession: {
    url: "https://reca.azurewebsites.net/api/v1/orders/checkout-session",
    method: "post",
  },
  createCashOrder: {
    url: "https://reca.azurewebsites.net/api/v1/orders",
    method: "post",
  },
  allOrders: {
    url: "https://reca.azurewebsites.net/api/v1/orders",
    method: "get",
  },
  setIsDelivered: {
    url: "https://reca.azurewebsites.net/api/v1/orders/",
    url2: "/deliver",
    method: "PUT",
  },
  setIsPaid: {
    url: "https://reca.azurewebsites.net/api/v1/orders/",
    url2: "/pay",
    method: "PUT",
  },
};

export default SummaryApi;
