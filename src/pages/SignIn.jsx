import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <>
        <button onClick={() => {navigate('dashboard'); toast.success("Login Successful")}} className='bg-yellow-800 text-slate-100 block ml-auto mr-auto'>
            To Dashboard
        </button>
    </>
    
  )
}
