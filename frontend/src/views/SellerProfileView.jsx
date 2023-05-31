import React, { useEffect, useState } from "react";
import { useQuery,useMutation } from "@apollo/client";
import { CREATE_CONVERSATION, GET_SELLER } from "../api/mutations";
import { useNavigate, useParams } from "react-router-dom";
import GigsList from "../components/GigsList";
import { PlusIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { getGigs } from '../redux/userGigsSlice';
import { useDispatch, useSelector } from "react-redux";

function SellerProfileView() {
  const { sellerId } = useParams();
  const { loading, error, data } = useQuery(GET_SELLER, {
    variables: { sellerId },
  });
  const gigs = useSelector((state) => state.user_gigs.gigs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const [seller, setSeller] = useState();
  const [user, setUser] = useState();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const sellerid = currentUser?.user?.seller?._id;

  useEffect(() => {
    if (data && data.seller) {
      setSeller(data.seller);
      setUser(data.seller.user);
      console.log(data.seller.gigs)
      if (gigs.length === 0) {
        dispatch(getGigs(data.seller.gigs));
      }
    }
  }, [data, dispatch, gigs]);

  const handleCreateConversation = async () => {
    if (data) {
      const result = await createConversation({
        variables: { users: [currentUser.user._id, seller.user.id] },
      });

      if (result.data && result.data.createConversation.id) {
        const newConversationId = result.data.createConversation.id;

        const newConversation = {
          _id: newConversationId,
          users: [currentUser.user._id, seller.user.id],
          messages: [],
        };

        currentUser.user.conversations.push(newConversation);

        localStorage.setItem("user", JSON.stringify(currentUser));

        navigate('/messages');
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
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
                 {currentUser && sellerid!==data.seller.id && <button
                    onClick={handleCreateConversation}
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                  >
                    Message
                  </button>}
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
        {gigs && <GigsList gigs={gigs} title="Seller gigs" />}
        </div>
      </div>):(<div>Loading ...</div>)}
    </>
  );
}

export default SellerProfileView;
