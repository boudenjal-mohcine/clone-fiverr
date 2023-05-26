import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCats } from "../redux/categorySlice";

function SubMenu() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const { cats, status, error } = categories;

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCats());
    }
  }, [dispatch, status]);

  return (
    <div>
      <div className="menu">
        {status === "successful" &&
          cats.map((item, index) => (
            <Link
              className="link menuLink"
              to={`/gigs?cat=${item.id}`}
              key={index}
            >
              {item.label}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SubMenu;
