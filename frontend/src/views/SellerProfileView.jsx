import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SELLER } from "../api/mutations";
import { useParams } from "react-router-dom";
import GigsList from "../components/GigsList";
import { PlusIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function SellerProfileView() {
  const { sellerId } = useParams();
  const { loading, error, data } = useQuery(GET_SELLER, {
    variables: { sellerId },
  });
  const [gigs, setGigs] = useState([]);
  const [seller, setSeller] = useState();
  const [user, setUser] = useState();

  const currentUser = JSON.parse(localStorage.getItem("user"));


  const currentSeller = JSON.parse(localStorage.getItem("seller"));

  //get seller id
  const sellerid =
    (currentUser && currentUser.user.isSeller)
      ? currentUser.user.seller._id
      : currentSeller?.id;

  useEffect(() => {
    if (data && data.seller) {
      setSeller(data.seller);
      setGigs(data.seller.gigs);
      setUser(data.seller.user);
    }
  }, [data]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  console.log(seller);
  return (
    <>
    {(!loading) ?  (<div className="flex flex-col md:flex-row px-8 mt-8">
        <div className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0">
          {seller && (
            <div className="ml-0 pr-0 md:pr-4 p-3 border border-gray-200 rounded-lg shadow py-10  ">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={`http://localhost:8000/profiles/${user.profilePicture}`}
                  alt={seller.first_name + " " + seller.last_name}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900">
                  {seller.first_name + " " + seller.last_name}
                </h5>
                <span className="text-sm text-gray-500">
                  @{user.username}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                  >
                    Message
                  </a>
                </div>
              </div>
              <p className="text-md px-5">
                <b>Skills: </b>
                {seller.skills.map((skill) => (
                  <span>{skill} </span>
                ))}
              </p>
              <p className="text-md px-5">
                <b>Membre depuis: </b>
                {formatDate(user.createdAt)}
              </p>
              <p className="text-md px-5">
                <b>Country: </b>
                {user.country ?? "MA"}
              </p>
              <p className="text-md px-5">
                <b>Email: </b>
                {user.email}
              </p>
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3 ml-0 pr-0 md:pr-4 p-3 border border-gray-200 rounded-lg shadow">
      { sellerid===data.seller.id && <Link
          to="/gigs/add"
        >
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-3 rounded-full float-right">
          <PlusIcon className="w-5 h-5" />
        </button>
        </Link>}
          <GigsList gigs={gigs} title="Seller gigs" />
        </div>
      </div>):(<div>Loading ...</div>)}
    </>
  );
}

export default SellerProfileView;
