import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassowrd";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import SellerPanel from "../pages/SellerPanel";
import SellerAllProducts from "../pages/SellerAllProduct";
import SellerAllOrders from "../pages/SellerAllOrdes";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import SubCategoryProduct from "../pages/SubCategoryProduct";
import Payment from "../pages/Payment";
import AllCategories from "../pages/AllCategories";
import AllSubCategories from "../pages/AllSubCategories";
import AllOrders from "../pages/AllOrders";
import Profile from "../pages/Profile";
import UserOrders from "../pages/UserOrders";
import ChangePassword from "../pages/ChangePassword";
import ChangeAccountDetails from "../pages/ChangeAccountDetails";
import Wishlist from "../pages/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "subcategory/:id",
        element: <SubCategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/orders",
        element: <UserOrders />,
      },
      {
        path: "profile/change-password",
        element: <ChangePassword />,
      },
      {
        path: "profile/update",
        element: <ChangeAccountDetails />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-categories",
            element: <AllCategories />,
          },
          {
            path: "all-subcategories",
            element: <AllSubCategories />,
          },
          {
            path: "all-orders",
            element: <AllOrders />,
          },
        ],
      },
      {
        path: "seller-panal",
        element: <SellerPanel />,
        children: [
          {
            path: "seller-all-Products",
            element: <SellerAllProducts />,
          },
          {
            path: "all-seller-orders",
            element: <SellerAllOrders />,
          },
        ],
      },
    ],
  },
]);

export default router;
