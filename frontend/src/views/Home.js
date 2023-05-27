import React from 'react'
import {Link}from 'react-router-dom'
export const Home = () => {
  return (
    <div>
     <Link to="/login" className='btn btn-primary btn-md'>LOGIN</Link> 
    </div>
  )
}
