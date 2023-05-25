import React, { useState, useEffect } from "react";
import "../styles/Gigs.css";
import GigCard from "../components/GigCard";
import { getGigs } from "../api/gigAPI";


function GigsView() {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        getGigs().then((result) => {
            setGigs(result);
          })
          .catch((error) => console.log(error));
      }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
         Popular gigs
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
        {gigs.map((gig,index) => (
          <GigCard gig={gig} key={index}></GigCard>
        ))}
      </div>
    </>
  );
}

export default GigsView;
