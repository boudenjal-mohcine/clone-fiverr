import {
    GET_ORDERS_GIG,
    ACCEPT_ORDER,
    CANCEL_ORDER,
    COMPLETE_ORDER,
  } from "../api/mutations";
  import React, { useEffect } from "react";
  import { useMutation, useQuery } from "@apollo/client";
  import { Link, useParams, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { getAllGigs } from "../redux/gigSlice";
  import { XIcon, CheckIcon, RefreshIcon } from "@heroicons/react/solid";
  
  export default function ClientOrdersView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gigId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allGigs = useSelector((state) => state.gigs);
    const { gigs, status } = allGigs;
    const [acceptOrder] = useMutation(ACCEPT_ORDER);
    const [cancelOrder] = useMutation(CANCEL_ORDER);
    const [completeOrder] = useMutation(COMPLETE_ORDER);
  
    if (!currentUser) {
      navigate("/login");
    }
  
    useEffect(() => {
      if (status === "idle") {
        dispatch(getAllGigs());
      }
    }, [dispatch, status]);
  
    useEffect(() => {
      if (gigs && gigs.length > 0) {
        const sellerOfGig = gigs.find((g) => g._id === gigId)?.seller?.id;
        if (currentUser.user.seller.id !== sellerOfGig) {
          navigate("/");
        }
      }
    }, [gigs, status]);
  
    const { loading, error, data } = useQuery(GET_ORDERS_GIG, {
      variables: { gigId },
    });
  
    if (loading) {
      return <div className="text-center mt-8">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center mt-8">Error: {error.message}</div>;
    }
  
    const orders = data.orderGig;
  
    const handleAccept = async (acceptOrderId) => {
      await acceptOrder({ variables: { acceptOrderId } });
  
      window.location.reload();
    };
  
    const handleCancel = async (cancelOrderId) => {
      await cancelOrder({ variables: { cancelOrderId } });
  
      window.location.reload();
    };
  
    const handleComplete = async (completeOrderId) => {
      await completeOrder({ variables: { completeOrderId } });
  
      window.location.reload();
    };
  
    return (
      <div className="container mx-auto my-10">
        {/* Pending Orders */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
          {orders.filter((order) => order.status === "active").length > 0 ? (
            <table className="w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Order ID
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Status
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Delivery Date
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Details
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.status === "active")
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="py-4 px-6 border-b">{order.id}</td>
                      <td className="py-4 px-6 border-b">{order.status}</td>
                      <td className="py-4 px-6 border-b">
                        {new Date(order.deleveredAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 border-b">{order.details}</td>
                      <td className="py-4 px-6 border-b">
                        <button
                          onClick={() => handleAccept(order.id)}
                          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
                        >
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleCancel(order.id)}
                          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        >
                          <XIcon className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No pending orders at the moment.</p>
          )}
        </div>
  
        {/* Current Orders */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
          {orders.filter((order) => order.status !== "active").length > 0 ? (
            <table className="w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Order ID
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Status
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Delivery Date
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Details
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-sm font-semibold text-gray-600 border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.status !== "active")
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="py-4 px-6 border-b">{order.id}</td>
                      <td className="py-4 px-6 border-b">{order.status}</td>
                      <td className="py-4 px-6 border-b">
                        {new Date(order.deleveredAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 border-b">{order.details}</td>
                      <td className="py-4 px-6 border-b">
                        {order.status === "in progress" && (
                          <button
                            onClick={() => handleComplete(order.id)}
                            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Complete Work
                          </button>
                        )}
                        {order.status === "completed" && (
                          <p>Waiting for response</p>
                        )}
                        {order.status === "revision request" && (
                          <button
                            onClick={() => handleComplete(order.id)}
                            className="flex items-center justify-center bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            <RefreshIcon className="h-4 w-4 mr-1" />
                            Finished revision
                          </button>
                        )}
                        {order.status === "delivered" && <p>Delivered</p>}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No current orders at the moment.</p>
          )}
        </div>
      </div>
    );
  }
  