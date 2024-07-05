import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Payment = () => {
  const [data, setData] = useState({
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    }
  });
  
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("cart");
  const [cartId, setCartId] = useState(searchQuery);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        shippingAddress: {...preve.shippingAddress,[name]: value},
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleVisa = async (e) => {
    
      const dataResponse = await fetch(`${SummaryApi.createCheckoutSession.url}/${cartId}`, {
        method: SummaryApi.createCheckoutSession.method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${context.token}`,
        },
        body: JSON.stringify(data),
      });
      console.log(dataResponse);
      const dataApi = await dataResponse.json();
      console.log(dataApi);
      console.log(data);

      if (dataApi.status === "success") {
        toast.success(dataApi.message);
        navigate(`//${dataApi.session.url}`);
      }

  };
  const handleCash = async (e) => {
    
      const dataResponse = await fetch(`${SummaryApi.createCashOrder.url}/${cartId}`, {
        method: SummaryApi.createCashOrder.method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${context.token}`,
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      console.log(dataApi);

      if (dataApi.status === "success") {
        toast.success("Order Created successfully.");
        context.fetchUserAddToCart();
        navigate("/");

      }

  };


  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            
            <div className="grid">
              <label>Phone : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="+201234567890"
                  name="phone"
                  value={data.shippingAddress.phone}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Address : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter Address"
                  name="details"
                  value={data.shippingAddress.details}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>City : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter City"
                  name="city"
                  value={data.shippingAddress.city}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Postal Code : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="number"
                  placeholder="enter Postal Code"
                  name="postalCode"
                  value={data.shippingAddress.postalCode}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handleCash} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Cash
              </button>
              <button onClick={handleVisa} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Visa/MasterCard
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;
