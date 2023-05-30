import React, { useEffect } from "react";
import "../styles/Gigs.css";
import GigCard from "../components/GigCard";


function GigsList({gigs,title}) {
  return (
    <>
    <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
      {title}
    </h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-3">
      {gigs.length !== 0 ? (
        gigs.map((gig) => (
          <GigCard gig={gig} id={gig.id ?? gig._id} key={gig.id ?? gig._id} />
        ))
      ) : (
        <h2 className="text-center text-bold absolute m-auto">No gigs</h2>
      )}
    </div>
  </>
  
  );
}

export default GigsList;