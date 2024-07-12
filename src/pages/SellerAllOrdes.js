import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Context from "../context";
import SellerOrder from "../components/SellerOrder"; 

const SellerAllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { token } = useContext(Context);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(
        "https://reca.azurewebsites.net/api/v1/orders/seller-orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const dataResponse = await response.json();

      if (dataResponse.status === "success") {
        setAllOrders(dataResponse.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Order Id</th>
            <th>Cart Items</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Is Delivered?</th>
            <th>Is Paid?</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <SellerOrder order={order} token={token} key={order._id} /> 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerAllOrders;
