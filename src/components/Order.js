import React, { useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const Order = ({ order, token }) => {
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);
  const [isPaid, setIsPaid] = useState(order.isPaid);

  const handleIsDeliveredClick = async (orderId) => {
    const fetchData = await fetch(SummaryApi.setIsDelivered.url + `${orderId}` + SummaryApi.setIsDelivered.url2, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.status === "success") {
      setIsDelivered(true);
      
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  const handleIsPaidClick = async (orderId) => {
    const fetchData = await fetch(SummaryApi.setIsPaid.url + `${orderId}` + SummaryApi.setIsPaid.url2, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.status === "success") {
      setIsPaid(true);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  return (
    <tr>
                <td>{order._id}</td>
                <td className="flex items-center justify-start gap-2">
                  {order?.cartItems?.map((cartItem, index) => {
                    const product = cartItem.product;
                    return product ? (
                      <img
                        key={index}
                        className="w-10 h-10 rounded-full"
                        src={product.imageCover}
                        alt="cart item"
                      />
                    ) : null;
                  })}
                </td>
                <td>{order?.totalOrderPrice}</td>
                <td>{order?.shippingAddress?.details}</td>
                <td>{order?.shippingAddress?.phone}</td>
                <td className="cursor-pointer" onClick={() => handleIsDeliveredClick(order?._id)}>{isDelivered ? "Yes" : "No"}</td>
                <td className="cursor-pointer" onClick={() => handleIsPaidClick(order?._id)}>{isPaid ? "Yes" : "No"}</td>
    </tr>
  )
}

export default Order