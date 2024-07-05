import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUserDetails = async (token1 = token) => {
    if (!token1) return;

    const dataResponse = await fetch(SummaryApi.current_user.url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataApi = await dataResponse.json();
    console.log(dataApi);

    if (dataApi.data) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    if (!token) return;

    const dataResponse = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.numOfCartItems);
  };

  useEffect(() => {
    /**user Details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart();
  }, [token]);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
          token,
          setToken,
        }}
      >
        <ToastContainer position="top-center" />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
