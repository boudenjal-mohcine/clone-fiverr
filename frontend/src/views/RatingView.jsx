import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { GET_ORDER,ADD_REVIEW } from "../api/mutations";
import { useMutation,useQuery } from "@apollo/client";

export default function RatingView({order}) {
  console.log(order)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview] = useMutation(ADD_REVIEW);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { orderId:order },
  });

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error.message}</div>;
  }




  const handleStarHover = (star) => {
    if (rating === 0) {
      setRating(star);
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmitReview = async() => {
    await addReview({ variables: { user:currentUser?.user._id,gig:data.order.gig.id,comment,rating } });
    setRating(0);
    setComment("");
    window.location.reload();
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-2">Add Review</h2>
      <div className="flex justify-center items-center space-x-2">
        {stars.map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400 cursor-pointer`}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={() => handleStarClick(star)}
          />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <label className="text-lg font-semibold">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
        ></textarea>
      </div>
      <button
        onClick={handleSubmitReview}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
      >
        Submit
      </button>
    </div>
  );
}
