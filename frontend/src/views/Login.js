import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../Store/userSlice';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const handleLoginEvent=(e)=>{
        e.preventDefault();
        let userCredentials={
            email,password
        }
        dispatch(loginUser(userCredentials)).then((result)=>{
            if(result.payload){
                setEmail('');
                setPassword('')
                navigate('/');
            }
        })
    }
  return (
    <from className='from-group custom-from'>
      <lable>Email</lable>  
      <input type='email' required className='form-control' value={email}onChange={(e)=>setEmail(e.target.value)}/>
      
      <br/>
      <lable>Password</lable>  
      <input type='password' required className='form-control'value={password}onChange={(e)=>setPassword(e.target.value)} />
      <br/>
      <button type='submit' className='btn btn-success btn-md'>LOGIN</button>
    </from>
  )
}

