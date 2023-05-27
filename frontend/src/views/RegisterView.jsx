import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { register } from '../api/userAPI';

const RegisterView = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Registration logic here
    console.log('Form submitted:', { username, email, password, country, image });

    // call api
    register({ username, email, password, country, image }).then((response)=>{
        alert(response.message)
    }).catch((err)=>{
        alert(err)
    })

    // Reset form fields
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCountry('');
    setImage(null);
    // // Navigate to home or desired route
    // navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const countryOptions = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CD', name: 'Democratic Republic of the Congo' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'FR', name: 'France' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'IR', name: 'Iran' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'KP', name: 'North Korea' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'MA', name: 'Morocco' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'RU', name: 'Russia' },
    { code: 'SD', name: 'Sudan' },
    { code: 'TR', name: 'Turkey' },
    { code: 'US', name: 'United States' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
  ];
  

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto" id="register-form">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            required
            value={country}
            onChange={handleCountryChange}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          >
            <option value="">Select a country</option>
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="profile" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            id="profile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
