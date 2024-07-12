import React, { useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ROLE from '../common/role';

const SellerOrder = ({ order, token }) => {
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);
  const [isPaid, setIsPaid] = useState(order.isPaid);
  const user = useSelector((state) => state?.user?.user);

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
      {user?.role === ROLE.SELLER && ( 
        <td>{order._id}</td>
      )}

      <td className="flex items-center justify-center gap-2">
        {order?.cartItems?.map((cartItem, index) => {
          const product = cartItem.product;
          return product ? (
            <img
              key={index}
              className="w-11 h-11 rounded-full"
              src={product.imageCover}
              alt="cart item"
            />
          ) : null;
        })}
      </td>
      <td>{order?.totalOrderPrice}</td>
      <td>{order?.shippingAddress?.details}</td>
      <td>{order?.shippingAddress?.phone}</td>

      {user?.role === ROLE.SELLER && ( 
        <>
          <td className="cursor-pointer" onClick={() => handleIsDeliveredClick(order?._id)}>{isDelivered ? "Yes" : "No"}</td>
          <td className="cursor-pointer" onClick={() => handleIsPaidClick(order?._id)}>{isPaid ? "Yes" : "No"}</td>
        </>
      )}

      {user?.role === ROLE.GENERAL && (
        <>
          <td>{String(order?.createdAt).substring(0, 10)}</td>
        </>
      )}
    </tr>
  );
};

export default SellerOrder;
