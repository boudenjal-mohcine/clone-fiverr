import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"
const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleLoginEvent = (e) => {
    e.preventDefault();
    const userCredentials = {
      email,
      password
    };

    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail('');
        setPassword('');
        navigate('/');
      }
    });
  };

  return (
    <div className="max-w-md mx-auto" id="login-form">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center p-4">Login</h1>
      <form onSubmit={handleLoginEvent} className="space-y-6">
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
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>

        {error && (
          <div className="text-red-500">{error}</div>
        )}
      </form>
    </div>
  );
}

export default LoginView;
