import React from "react";
import { Link } from "react-router-dom";

function GigCard({ gig, id, path }) {
  const url = "http://127.0.0.1:8000/banners/";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow ">
      <Link
        to={{
          pathname: `/gigs/${id}`,
        }}
      >
        <img
          className="p-2 rounded-t-lg"
          src={url + gig.banner}
          alt="gig banner"
          width="500"
          height="100"
          href="/"
        />
      </Link>
      <div className="px-4 py-3">
        <Link
          to={{
            pathname: `/gigs/${id}`,
          }}
          className="text-sm font-semibold tracking-tight text-gray-900"
        >
          {gig.title}{" "}
        </Link>
        <h6 className="text-sm tracking-tight text-gray-900">
          {gig?.category?.label}
        </h6>
        <div className="flex items-center mt-2.5 mb-5">
          {gig?.reviews ? (
            Array.from({
              length: gig?.reviews[gig?.reviews.length - 1]?.rating ?? 0,
            }).map((_, index) => (
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))
          ) : (
            <div></div>
          )}
          {gig?.reviews && gig.reviews.length>0? (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {gig?.reviews[0]?.rating}
            </span>
          ) : (
            <div></div>
          )}
        </div>
        <p className="text-sm text-gray-600">{gig.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-gray-900 ">${gig.price}</span>
        </div>
      </div>
    </div>
  );
}

export default GigCard;