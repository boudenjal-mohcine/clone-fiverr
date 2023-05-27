import React, {useEffect } from "react";
import "../styles/Gigs.css";
import GigCard from "../components/GigCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllGigs } from "../redux/gigSlice";



function GigsView() {
    const dispatch = useDispatch();
    const random_gigs = useSelector((state) => state.gigs);
    const { gigs, status } = random_gigs;

    // useEffect(() => {
    //     getGigs().then((result) => {
    //         setGigs(result);
    //       })
    //       .catch((error) => console.log(error));
    //   }, []);

    useEffect(() => {
      if (status === "idle") {
        dispatch(getAllGigs());
      }
    }, [dispatch, status]);

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
         Popular gigs
      </h1>
      {status==="successful"?(
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
       { gigs.map((gig,index) => (
          <GigCard gig={gig} index={index} key={index}></GigCard>
        ))
        }
      </div>):(<h1 className="text-xl text-center">Loading...</h1>)}
    </>
  );
}

export default GigsView;
