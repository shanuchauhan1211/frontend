import React from 'react';
import { useNavigate } from "react-router-dom";
export default function Dashboard(){
    const navigate = useNavigate();
const data = JSON.parse(localStorage.getItem('Token'));
console.log(data)
    return(
        <>
        <div className='h-screen w-full'>
            <div className=' h-[10vh] md:h-[15vh] w-full bg-[#5a155a] flex justify-between items-center px-6'>
                <p className='text-3xl text-white font-semibold'>Dashboard</p>
                <button onClick={()=>{localStorage.removeItem('Token'); alert("User is Logging Out"); navigate("/");}} className=' bg-white h-[50px] w-[110px] rounded-lg text-[#5a155a] text-xl font-medium '>Sign Out </button>
            </div>
            <div className='h-[50vh] md:h-[70vh] w-full flex flex-col  py-5 items-center'> 
                <div className='h-[50%] md:h-[100%] w-[90%] flex flex-col justify-center items-center shadow-[0_0_10px_2px_rgb(211,211,201)]'>
                    <p className='text-2xl md:text-4xl  p-3'>Welcome,{data.firstname}{data.lastname}</p>
                   <div className='flex items-center gap-4 '>
                    <p className='text-xl md:text-3xl font-bold'>Email:</p>
                    <p className='text-xl'>{data.email}</p>
                    </div>
                </div>
            </div>
            <div className='fixed md:hidden bottom-0 h-[10vh] md:h-[15vh] w-full bg-[#5a155a]'></div>
        </div>
        </>
    )
}