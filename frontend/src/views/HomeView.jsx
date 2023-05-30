import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGigs } from "../redux/gigSlice";
import { getCats } from "../redux/categorySlice";
import GigsList from "../components/GigsList";
import JoinUs from "../components/JoinUs";

export default function HomeView() {
  const dispatch = useDispatch();
  const random_gigs = useSelector((state) => state.gigs);
  const categories = useSelector((state) => state.categories);
  const { gigs, status } = random_gigs;
  const state_cats = categories.state;

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllGigs());
    }
    if (state_cats === "idle") {
      dispatch(getCats());
    }
  }, [dispatch, status, state_cats]);

  return (
    <>
      <GigsList gigs={gigs} title="Popular Gigs"></GigsList>
      <JoinUs></JoinUs>
    </>
  );
}
