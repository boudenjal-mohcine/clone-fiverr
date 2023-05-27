import React, { useEffect } from "react";
import "../styles/Gigs.css";
import GigCard from "../components/GigCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllGigs } from "../redux/gigSlice";
import { useParams } from "react-router-dom";
import { getCats } from "../redux/categorySlice";

function GigsView() {
  
  const dispatch = useDispatch();
  const random_gigs = useSelector((state) => state.gigs);
  const categories = useSelector((state) => state.categories);
  const { id } = useParams();
  const { gigs, status } = random_gigs;
  const cats = categories.cats;
  const state_cats = categories.state;

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
    if (state_cats === "idle") {
      dispatch(getCats());
    }
  }, [dispatch, status, state_cats]);

  let gigsOfCat = [];
  if (id && id < cats.length) {
    gigsOfCat = gigs
      .filter((g) => g.category._id === cats[id].id)
      .map((g) => g._id);
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
        {(status === "successful" && state_cats === "successful") ||
          (!id ? "Popular gigs" : cats[id].label + " Gigs")}
      </h1>
      {status === "successful" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
          {gigs.length !== 0 ? (
            !id ? (
              gigs.map((gig, index) => (
                <GigCard gig={gig} index={index} key={index}></GigCard>
              ))
            ) : gigsOfCat.length !== 0 ? (
              gigs.map((gig, index) =>
                !gigsOfCat.includes(gig._id) ? null : (
                  <GigCard gig={gig} index={index} key={index} />
                )
              )
            ) : (
              <h2 className="text-center text-bold absolute m-auto">
                No gigs for this category
              </h2>
            )
          ) : (
            <h2 className="text-center text-bold absolute m-auto">No gigs</h2>
          )}
        </div>
      ) : (
        <h1 className="text-xl text-center">Loading...</h1>
      )}
    </>
  );
}

export default GigsView;