import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Login = () => {
   
   //states
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
//redux state
const {user,loading,error}=useSelector((state)=>state.user);


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
    console.log(user);
  return (
    <form className='from-group custom-from'>
      <lable>Email</lable>  
      <input type='email' required className='form-control' value={email}onChange={(e)=>setEmail(e.target.value)}/>
      
      <br/>
      <lable>Password</lable>  
      <input type='password' required className='form-control'value={password}onChange={(e)=>setPassword(e.target.value)} />
      <br/>
      <button type='submit' onClick={handleLoginEvent} className='btn btn-success btn-md'>
        {loading?'Loading ...':'Login'}
      </button>
      {error && (   
        <div className='alert alert-danger' role='alert'>{error}</div>
      )}
    </form>
  )
}

