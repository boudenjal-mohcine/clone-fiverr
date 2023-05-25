import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
    }
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
