import React, { useEffect } from "react";
import "../styles/Gigs.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGigs } from "../redux/gigSlice";
import { useParams } from "react-router-dom";
import GigsList from "../components/GigsList";

function GigsByCategoryView() {
  
  const dispatch = useDispatch();
  const random_gigs = useSelector((state) => state.gigs);
  const { catId } = useParams();
  const { gigs, status } = random_gigs;


  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllGigs());
    }

  }, [dispatch, status]);

  console.log(gigs);
  console.log(catId);

  const filtred = gigs.filter((g)=>g.category._id===catId)
 
  return (
    <>
      {status === "successful" ? (
            (filtred.length!==0)? <GigsList gigs={filtred} title={filtred[0].category.label} ></GigsList> : <div>No Gig found</div>
      ) : (
        <h1 className="text-xl text-center">Loading...</h1>
      )}
    </>
  );
}

export default GigsByCategoryView;