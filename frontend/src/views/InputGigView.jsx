import "../styles/Gigs.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_GIG, EDIT_GIG } from "../api/mutations";
import { useDispatch, useSelector } from "react-redux";
import { getCats } from "../redux/categorySlice";
import { useParams } from "react-router-dom";
import { getAllGigs } from "../redux/gigSlice";
import { addGig } from "../redux/userGigsSlice";
function InputGigView() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(parseFloat(0));
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [createGig] = useMutation(ADD_GIG);
  const [editGig] = useMutation(EDIT_GIG);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const allGigs = useSelector((state) => state.gigs);
  const { cats, status } = categories;
  const gigs = allGigs.gigs;
  const status_gigs = allGigs.status;
  const [updateGigId, setUpdateGigId] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) navigate("/login");

  //get seller id
  const seller = currentUser.user.isSeller
    ? currentUser.user.seller._id
    : JSON.parse(localStorage.getItem("seller")).id;

  const { gigId } = useParams();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCats());
    }
    if (status_gigs === "idle") {
      dispatch(getAllGigs());
    }
    if (gigId) {
      setEditMode(true);
    }
  }, [dispatch, status, status_gigs]);

  useEffect(() => {
    if (gigs && gigs.length > 0 && editMode) {
      setUpdateGigId(gigs.find((g) => g._id === gigId));
      console.log(gigs.find((g) => g._id === gigId));
      console.log(editMode);
      setTitle(updateGigId.title);
      setDescription(updateGigId.description);
      setCategory(updateGigId.category);
      setPrice(updateGigId.price);
    }
  }, [gigs, editMode, updateGigId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", {
      title,
      description,
      category,
      price,
      banner,
    });
    if (!editMode) {
      const response = await createGig({
        variables: { title, description, price, category, seller, banner },
      });

      const userGigs = JSON.parse(localStorage.getItem("user_gigs"));
      console.log(response.data.createGig)
      dispatch(addGig((response.data.createGig)));

      // Update localStorage
      localStorage.setItem("user_gigs", JSON.stringify(userGigs));
      

    } else if (banner === null) {
      await editGig({
        variables: {
          title,
          description,
          price,
          category,
          seller,
          updateGigId: updateGigId._id,
        },
      });
    } else {
      await editGig({
        variables: {
          title,
          description,
          price,
          category,
          seller,
          banner,
          updateGigId: updateGigId._id,
        },
      });
    }
    // Reset form fields
    setTitle("");
    setDescription("");
    setCategory("");
    setPrice("");
    setBanner(null);
    //navigate to home
    navigate(`/seller/${seller}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
  };

  console.log("outside" + editMode);
  return (
    <>
      {currentUser &&
      gigs &&
      status_gigs === "successful" &&
      status === "successful"
       ? (
        <div>
          {editMode &&updateGigId && updateGigId ? (
            seller === updateGigId.seller._id ? (
              <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
                Edit gig
              </h1>
            ) : (
              navigate("/")
            )
          ) : (
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
              Add gig
            </h1>
          )}

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
                ></textarea>
              </div>

              {!editMode && (
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
                  >
                    <option value="">Select a category</option>
                    {status === "successful" ? (
                      cats.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))
                    ) : (
                      <option>Loading ...</option>
                    )}
                  </select>
                </div>
              )}

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banner Image
                </label>
                <input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editMode ? "Edit" : "Add"} Gig
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}

export default InputGigView;
