import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Verification() {
  const navigate = useNavigate();
const [verifyotp,setVerifyotp]= useState('');
const Userdata = JSON.parse(localStorage.getItem("Userdata"));
console.log(Userdata)
const handleVerification = async (e) => {
  e.preventDefault()
try {
  const response = await axios.post("http://localhost:5000/User/verifyEmail", {
    userId: Userdata.data.userId,
    otp: verifyotp,
  });
  if (response.status === 200) {
    console.log(response);
    console.log(response.data);
   localStorage.removeItem("Userdata");
  } else {
    console.log("hey");
  }

  alert("Email is verified");
  navigate("/");



} catch (error) {
  alert("Please Enter Correct OTP");
  console.log(error);
}
}


  return (
    <div className='bg-[#000000a9] h-screen w-full flex items-center justify-center'>
     <div className='h-[60%] w-[80%] bg-white rounded-lg shadow-white text-center gap-10 p-4 items-center flex flex-col'>
        <p className='text-3xl font-semibold'>Email Verification</p>
        <p className='text-xl font-semibold'>Check your email {Userdata?.data.email} for OTP and type here to complete Email verification </p>
        <input type="text" onChange={(e)=>{setVerifyotp(e.target.value);}} value={verifyotp}  placeholder='OTP' className='bg-slate-300 h-[40px] w-[100px] text-xl rounded-lg p-3' />
        <button onClick={handleVerification} className='bg-[#22c722] text-white h-[40px] w-[100px] rounded-md hover:bg-green-900'>Verify</button>
        <button onClick={()=>{navigate("/");}} className='bg-[#751375] text-white h-[40px] w-[200px] rounded-md hover:bg-purple-900'> Return to Home Page</button>
     </div>
    </div>
  );
}
