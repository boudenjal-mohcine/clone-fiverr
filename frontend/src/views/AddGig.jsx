import '../styles/Gigs.css'
import React, { useState, useEffect } from "react";
import { getCategories } from "../api/categoryAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { ADD_GIG } from '../api/mutations';
import { useDispatch, useSelector } from "react-redux";
import { getCats } from "../redux/categorySlice";



function AddGig() {

    //const [cats, setCats] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(parseFloat(0));
    const [banner, setBanner] = useState(null);
    const navigate = useNavigate();

    const [createGig] = useMutation(ADD_GIG);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const { cats, status, error } = categories;
    // useEffect(() => {
    //     getCategories().then((result) => {
    //         setCats(result);
    //       })
    //       .catch((error) => console.log(error));
    //   }, []);

    useEffect(() => {
      if (status === "idle") {
        dispatch(getCats());
      }
    }, [dispatch, status]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', { title, description, category, price,banner });
        await createGig({ variables: { title,description,price,category,seller:"646f985fc2f03639ad9db007" ,banner} })
        // Reset form fields
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice('');
        setBanner(null)
        //navigate to home
        navigate("/")
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBanner(file);
      };
    
    

    return ( <div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">
         Add gig
      </h1> 
      <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
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
            {status=="successful"?(cats.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))):<option>Loading ...</option>}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="banner" className="block text-sm font-medium text-gray-700">
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
            Add Gig
          </button>
        </div>
      </form>
    </div>   
      </div> );
}

export default AddGig;