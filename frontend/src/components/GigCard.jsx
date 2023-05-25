import React from "react";
import { api } from "../config/config";

function GigCard({ gig }) {
  const url = "http://127.0.0.1:8000/banners/";
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow ">
      <a href="#">
        <img
          className="p-2 rounded-t-lg"
          src={url + gig.banner}
          width="500"
          height="200"
        />
      </a>
      <div className="px-4 py-3">
        <a href="#">
          <h5 className="text-sm font-semibold tracking-tight text-gray-900">
            {gig.title}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {gig.reviews.forEach((element) => {
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
              {gig.reviews[0] ?? 0}
            </span>;
          })}
        </div>
        <p className="text-sm text-gray-600">{gig.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-gray-900 ">${gig.price}</span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Show more
          </a>
        </div>
      </div>
    </div>
  );
}

export default GigCard;
