import React from "react";
import "../styles/Gigs.css";
import GigCard from "../components/GigCard";

function GigsView() {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
         Popular gigs
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <GigCard></GigCard>
        ))}
      </div>
    </>
  );
}

export default GigsView;
