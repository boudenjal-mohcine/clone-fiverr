import React, { useState } from "react";
import "../styles/Login.css";
import { useMutation } from '@apollo/client';
import { BECOME_SELLER } from '../api/mutations';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSeller } from "../redux/userSlice";

export default function BecomeSellerView() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("user"))

  if(!currentUser){
    navigate("/login")
  }

  if(currentUser.user?.isSeller){
     alert("Already a seller")
  }

  const user = currentUser.user._id

  console.log(user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState([]);
  const [becomeSeller] = useMutation(BECOME_SELLER);

  const handleBecomeSeller = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", { firstName, lastName, skills });
    const response = await becomeSeller({ variables: { firstName,lastName,skills,user} })
    // dispatch(setSeller(response.data));
    console.log(response.data);
    localStorage.setItem('seller',JSON.stringify(response.data.createSeller))
    setFirstName("");
    setLastName("");
    setSkills([]);

    navigate('/')
  };



  const handleSkillsChange = (e) => {
    const enteredSkills = e.target.value.split(",").map((skill) => skill.trim());
    setSkills(enteredSkills);
  };

  return (
    <div className="max-w-md mx-auto" id="become-seller-form">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
        Become a seller
      </h1>
      <form onSubmit={handleBecomeSeller} className="space-y-6">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First name
          </label>
          <input
            id="first_name"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <input
            id="skills"
            type="text"
            placeholder="Enter skills separated by commas"
            value={skills.join(", ")}
            onChange={handleSkillsChange}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
