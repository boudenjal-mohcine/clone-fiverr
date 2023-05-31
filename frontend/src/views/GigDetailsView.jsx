import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllGigs } from "../redux/gigSlice";
import React, { useEffect, useState } from "react";
import { getCats } from "../redux/categorySlice";
import {
  PencilAltIcon,
  TrashIcon,
  CheckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { useMutation } from "@apollo/client";
import { DELETE_GIG } from "../api/mutations";
import GigCard from "../components/GigCard";
import { MAKE_ORDER } from "../api/mutations";
import { UserIcon } from "@heroicons/react/solid";

function GigDetailsView() {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const { gigId } = useParams();
  const allGigs = useSelector((state) => state.gigs);
  const { gigs, status } = allGigs;
  const categories = useSelector((state) => state.categories);
  const state_cats = categories.state;
  const cats = categories.cats;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [makeOrder] = useMutation(MAKE_ORDER);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleMakeOrder = () => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    setShowOrderDetails(true);
  };

  const handleDeliveryDateChange = (event) => {
    setDeliveryDate(event.target.value);
  };

  const handleAdditionalDetailsChange = (event) => {
    setAdditionalDetails(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab("details");

    if (status === "idle") {
      dispatch(getAllGigs());
    }
    if (state_cats === "idle") {
      dispatch(getCats());
    }
  }, [dispatch, status, location, state_cats]);

  const gig = gigs.find((g) => g._id??g.id === gigId);
  console.log(gigs);
  const url = "http://127.0.0.1:8000/banners/";

  //same categories

  const same = gigs
    .filter((g) => g.category._id === (gig.category._id??gig.category.id) && (g._id !== gig._id??gig.id))
    .map((g) => g._id);

  const seller = JSON.parse(localStorage.getItem("seller"));

  //get seller id
  const sellerid =
    currentUser && currentUser.user.isSeller
      ? currentUser.user.seller._id
      : seller?.id;

  const handleOrderSubmit = async () => {
    await makeOrder({
      variables: {
        buyer: currentUser.user.buyer._id,
        gig: gig._id,
        deleveredAt: new Date(deliveryDate),
        details: additionalDetails,
      },
    });
    setDeliveryDate("");
    setAdditionalDetails("");
    setShowOrderDetails(false);
  };

  console.log("is local : " + sellerid);
  console.log("seller : " + gig?.seller?._id);

  const [deleteGig] = useMutation(DELETE_GIG);

  const handleDeleteGig = async () => {
    await deleteGig({ variables: { deleteGigId: gigId } });

    navigate(`/seller/${sellerid}`);

    window.location.reload();
  };

  return (
    <>
      {status === "successful" && gigs ? (
        status === "successful" ? (
          <>
            <div className="flex px-8 mt-8">
              <div className="w-2/3 pr-4">
                {/* Tabs */}
                <div className="w-full bg-white border-gray-200 rounded-lg shadow">
                  <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                      <li class="inline-flex items-center">
                        <Link
                          to="/"
                          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                        >
                          <svg
                            aria-hidden="true"
                            class="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          Home
                        </Link>
                      </li>
                      <li>
                        <div class="flex items-center">
                          <svg
                            aria-hidden="true"
                            class="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <Link
                            to={`/cat/${gig.category._id}`}
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                          >
                            {gig.category.label}
                          </Link>
                        </div>
                      </li>
                      <li aria-current="page">
                        <div class="flex items-center">
                          <svg
                            aria-hidden="true"
                            class="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 ">
                            {gig.title}
                          </span>
                        </div>
                      </li>
                    </ol>
                  </nav>

                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select tab
                    </label>
                    <select
                      id="tabs"
                      className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) => handleTabChange(e.target.value)}
                      value={activeTab}
                    >
                      <option value="details">Gig detail</option>
                      <option value="seller">Seller information</option>
                      <option value="reviews">Reviews</option>
                    </select>
                  </div>
                  <ul
                    className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex"
                    id="fullWidthTab"
                    data-tabs-toggle="#fullWidthTabContent"
                    role="tablist"
                  >
                    <li
                      className={`w-full ${
                        activeTab === "details" ? "bg-gray-100" : ""
                      }`}
                    >
                      <button
                        id="details-tab"
                        data-tabs-target="#details"
                        type="button"
                        role="tab"
                        aria-controls="details"
                        aria-selected={activeTab === "details"}
                        className="inline-block w-full p-4 rounded-tl-lg hover:bg-gray-100 focus:outline-none"
                        onClick={() => handleTabChange("details")}
                      >
                        Gig Details
                      </button>
                    </li>
                    <li
                      className={`w-full ${
                        activeTab === "seller" ? "bg-gray-100" : ""
                      }`}
                    >
                      <button
                        id="seller-tab"
                        data-tabs-target="#seller"
                        type="button"
                        role="tab"
                        aria-controls="seller"
                        aria-selected={activeTab === "seller"}
                        className="inline-block w-full p-4 hover:bg-gray-100 focus:outline-none"
                        onClick={() => handleTabChange("seller")}
                      >
                        Seller Informations
                      </button>
                    </li>
                    <li
                      className={`w-full ${
                        activeTab === "reviews" ? "bg-gray-100" : ""
                      }`}
                    >
                      <button
                        id="reviews-tab"
                        data-tabs-target="#reviews"
                        type="button"
                        role="tab"
                        aria-controls="reviews"
                        aria-selected={activeTab === "reviews"}
                        className="inline-block w-full p-4 rounded-tr-lg hover:bg-gray-100 focus:outline-none"
                        onClick={() => handleTabChange("reviews")}
                      >
                        Reviews
                      </button>
                    </li>
                  </ul>
                  <div
                    id="fullWidthTabContent"
                    className="border-t border-gray-200"
                  >
                    <div
                      className={`p-4 bg-white rounded-lg md:p-8 ${
                        activeTab === "details" ? "" : "hidden"
                      }`}
                      id="details"
                      role="tabpanel"
                      aria-labelledby="details-tab"
                    >
                      {/* Gig Details */}
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{gig.title}</h2>
                        <img
                          src={url + gig.banner}
                          alt="Gig Banner"
                          className="mb-6 rounded-lg shadow-lg"
                        />
                        <p className="text-gray-700 mb-4">
                          Category:{" "}
                          <span className="font-semibold">
                            {gig.category.label}
                          </span>
                        </p>
                        <p className="text-gray-700">{gig.description}</p>
                      </div>
                    </div>
                    <div
                      className={`p-4 bg-white rounded-lg md:p-8 ${
                        activeTab === "seller" ? "" : "hidden"
                      }`}
                      id="seller"
                      role="tabpanel"
                      aria-labelledby="seller-tab"
                    >
                      <div className="px-8">
                        <h2 className="text-2xl font-bold mb-2">
                          Seller Details
                        </h2>
                        <p className="text-gray-700 mb-2">
                          First Name:{" "}
                          <span className="font-semibold">
                            {gig.seller?.first_name}
                          </span>
                        </p>
                        <p className="text-gray-700 mb-2">
                          Last Name:{" "}
                          <span className="font-semibold">
                            {gig.seller?.last_name}
                          </span>
                        </p>
                        <div>
                          <p className="text-gray-700 mb-2 font-semibold">
                            Skills:
                          </p>
                          <ul className="list-disc list-inside">
                            {gig.seller?.skills.map((skill, index) => (
                              <li key={index} className="text-gray-700">
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link
                        to={`/seller/${gig?.seller?._id}`}
                        >
                        <button className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          <UserIcon className="h-4 w-4 mr-2" />

                          <span>Show Profile</span>
                        </button>
                        </Link>
                      </div>
                    </div>
                    <div
                      className={`p-4 bg-white rounded-lg md:p-8 ${
                        activeTab === "reviews" ? "" : "hidden"
                      }`}
                      id="reviews"
                      role="tabpanel"
                      aria-labelledby="reviews-tab"
                    >
                      <div>
                        {gig.reviews.length !== 0 ? (
                          gig.reviews.map((review) => (
                            <div
                              key={review.id}
                              className="border border-gray-300 rounded p-4 mb-4"
                            >
                              <h3 className="text-lg font-bold mb-2">
                                {review.name}
                              </h3>
                              <p className="text-gray-700 mb-2">
                                <div className="flex items-center mt-2.5 mb-5">
                                  {Array.from({
                                    length: review.rating ?? 0,
                                  }).map((_) => (
                                    <svg
                                      aria-hidden="true"
                                      class="w-5 h-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                  ))}
                                </div>
                              </p>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))
                        ) : (
                          <h2 className="text-center">No reviews</h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/3 pl-4 pr-12">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                  {sellerid === gig.seller._id && (
                    <h5 className="mb-4 text-xl font-medium text-gray-500 ">
                      Make an order
                    </h5>
                  )}
                  <div className="flex items-baseline text-gray-900 ">
                    <span className="text-3xl font-semibold">$</span>
                    <span className="text-5xl font-extrabold tracking-tight">
                      {gig.price}
                    </span>
                  </div>
                  <ul className="space-y-5 my-7">
                    <li className="flex space-x-3">
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Check icon</title>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-normal leading-tight text-gray-500 ">
                        {gig.description}
                      </span>
                    </li>
                    <li className="flex space-x-3">
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Check icon</title>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-normal leading-tight text-gray-500 ">
                        Payment Methods: PayPal, Credit Card
                      </span>
                    </li>
                  </ul>
                  <div className="relative p-10 ">
                    {sellerid === gig.seller._id ? (
                      <Link to={`/orders/${gig._id}`}>
                        <button
                          type="button"
                          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                        >
                          <CheckIcon className="h-5 w-5 mr-2" /> Show Clients
                          Orders
                        </button>
                      </Link>
                    ) : (
                      !showOrderDetails && (
                        <button
                          type="button"
                          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                          onClick={handleMakeOrder}
                        >
                          <ShoppingBagIcon className="h-5 w-5 mr-2" /> Make
                          Order
                        </button>
                      )
                    )}

                    {showOrderDetails && (
                      <div className="absolute left-0 right-0 bottom-0 bg-white p-4">
                        <form onSubmit={handleOrderSubmit}>
                          <label className="block mb-2">Delivery Date:</label>
                          <input
                            type="date"
                            className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                            value={deliveryDate}
                            required
                            onChange={handleDeliveryDateChange}
                          />

                          <label className="block mb-2">
                            Additional Details:
                          </label>
                          <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                            value={additionalDetails}
                            onChange={handleAdditionalDetailsChange}
                            required
                          />

                          <button
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5"
                          >
                            Submit Order
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                {sellerid === gig.seller._id && (
                  <div className="w-full mt-3 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <h5 className="mb-4 text-xl text-center font-medium text-gray-500 ">
                      Actions
                    </h5>
                    <Link to={`/gigs/edit/${gig._id}`}>
                      <button className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        <PencilAltIcon className="w-5 h-5 mr-2" />
                        Edit
                      </button>
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={handleDeleteGig}
                      className="flex items-center justify-center w-full px-4 py-2 mt-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      <TrashIcon className="w-5 h-5 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="px-8 py-10">
              <h1 className="text-2xl font-bold my-4 text-center my-5">
                More {gig.category.label} Gigs{" "}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
                {gigs.map((gig, index) =>
                  !same.includes(gig._id) ? null : (
                    <GigCard gig={gig} id={gig._id} key={index} />
                  )
                )}
              </div>
            </div>
            <hr />
          </>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <h2>Gig not found</h2>
      )}
    </>
  );
}

export default GigDetailsView;
