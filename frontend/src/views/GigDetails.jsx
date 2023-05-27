import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllGigs } from "../redux/gigSlice";
import React, { useEffect, useState } from "react";
import GigCard from "../components/GigCard";
import { useLocation } from "react-router-dom";

function GigDetails() {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  const { id } = useParams();
  const allGigs = useSelector((state) => state.gigs);
  const { gigs, status } = allGigs;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab("details")

    if (status === "idle") {
      dispatch(getAllGigs());
    }
    
  }, [dispatch, status,location]);

  const gig = gigs[id];
  const url = "http://127.0.0.1:8000/banners/";

  //same categories

  const same = gigs
    .filter((g) => g.category._id === gig.category._id && g._id !== gig._id)
    .map((g) => g._id);
  console.log(same);

  return (
    <>
      {status === "successful" ? (
        <>
          <h1 className="text-2xl font-bold my-4 text-center">Gig Details</h1>
          <div className="flex px-8 mt-8">
            <div className="w-2/3 pr-4">
              {/* Tabs */}
              <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
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
                          {gig.seller.first_name}
                        </span>
                      </p>
                      <p className="text-gray-700 mb-2">
                        Last Name:{" "}
                        <span className="font-semibold">
                          {gig.seller.last_name}
                        </span>
                      </p>
                      <div>
                        <p className="text-gray-700 mb-2 font-semibold">
                          Skills:
                        </p>
                        <ul className="list-disc list-inside">
                          {gig.seller.skills.map((skill, index) => (
                            <li key={index} className="text-gray-700">
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
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
                                {Array.from({ length: review.rating ?? 0 }).map(
                                  (_) => (
                                    <svg
                                      aria-hidden="true"
                                      class="w-5 h-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                  )
                                )}
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

            <div className="w-1/3 pl-4">
              <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                <h5 className="mb-4 text-xl font-medium text-gray-500 ">
                  Make an order
                </h5>
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
                <button
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Make Order
                </button>
              </div>
            </div>
          </div>
          <div className="px-8">
            <h1 className="text-2xl font-bold my-4 text-center my-5">
              More {gig.category.label} Services{" "}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
              {gigs.map((gig, index) =>
                !same.includes(gig._id) ? null : (
                  <GigCard gig={gig} index={index} key={index} />
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default GigDetails;
