import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/ui/Button';



const NotFound = () => {
    const navigate = useNavigate();


  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4' >
        <h1 className='text-6xl text-center'>404</h1>
        <h2 className='text-2xl text-center text-gray-500'>Page Not Found</h2>
        <Button onClick={() => navigate("/") }>Go To Home</Button>
        
    </div>
  )
}

export default NotFound