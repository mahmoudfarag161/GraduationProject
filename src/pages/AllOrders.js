import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import Order from "../components/Order";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { token } = useContext(Context);

  const fetchAllOrders = async () => {
    const fetchData = await fetch(SummaryApi.allOrders.url, {
      method: SummaryApi.allOrders.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.data) {
      setAllOrders(dataResponse.data);
      console.log(dataResponse);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
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
            <th>Adress</th>
            <th>Phone</th>
            <th>Is Delivered?</th>
            <th>Is Paid?</th>
            
          </tr>
        </thead>
        <tbody className="">
          {allOrders.map((order, index) => {
            return (
              <Order order={order} token={token} key={order?._id} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
