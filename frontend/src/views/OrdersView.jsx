import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORDERS_BUYER, DELIVER_ORDER, REJECT_ORDER, ADD_REVIEW } from "../api/mutations";
import { useNavigate } from "react-router-dom";
import RatingView from "./RatingView";

export default function OrdersView() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const buyerId = currentUser.user.buyer._id;
  const [deliverOrder] = useMutation(DELIVER_ORDER);
  const [rejectOrder] = useMutation(REJECT_ORDER);
  const [addReview] = useMutation(ADD_REVIEW);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!currentUser) navigate("/login");
  const { loading, error, data } = useQuery(GET_ORDERS_BUYER, {
    variables: { buyerId },
  });

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error.message}</div>;
  }

  const orders = data.buyer.orders;

  const handleAccept = async (deliverOrderId) => {
    await deliverOrder({ variables: { deliverOrderId } });
    setShowReviewForm(true);

  };

  const handleRevision = async (rejectOrderId) => {
    await rejectOrder({ variables: { rejectOrderId } });
    setShowReviewForm(false);
    window.location.reload();

  };


  return (
    <div className="container mx-auto mt-8 mb-16 text-center">
      <div className="max-w-full">
        <h1 className="text-2xl font-bold mb-4">OrdersView</h1>
        {orders.length === 0 ? (
          <p className="text-center">No orders yet.</p>
        ) : (
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Delivery Date</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">
                    {order.status === "completed" ? (
                      <>
                        {showReviewForm ? (
                          <RatingView order={order.id}/>
                        ) : (
                          <>
                            <button
                              onClick={() => handleAccept(order.id)}
                              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded mr-2"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRevision(order.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                            >
                              Require Revision
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <span
                        className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                          order.status === "active"
                            ? "bg-yellow-400 text-yellow-800"
                            : order.status === "in progress"
                            ? "bg-green-400 text-green-800"
                            : order.status === "complete"
                            ? "bg-blue-400 text-blue-800"
                            : order.status === "delivered"
                            ? "bg-purple-400 text-purple-800"
                            : ""
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.deleveredAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{order.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
