import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function SignIn({log,setLog}){
  const navigate = useNavigate();
  var token_key = "";
  const initialSignin = { password: "", email: ""};
  const [logUser, setLogUser] = useState(initialSignin);

  const handleLogin = async (e) => {
  e.preventDefault()
try {
  const response = await axios.post("http://localhost:5000/User/logIn", {
    email: logUser.email,
    password: logUser.password,
  });
  if (response.status === 200) {
    console.log(response);
    console.log(response.data);
    token_key = JSON.stringify(jwtDecode(response.data.token));
    console.log(token_key);
    localStorage.setItem("Token", token_key);
  } else {
    console.log("hey");
  }
 setLogUser(initialSignin);

 if(response.data.token.verified === false)
  {
alert("Verify your email please");
navigate("/");
  }

else{alert("Logged in");
  navigate("/dashboard");
}


} catch (error) {
  alert("Check Username or Password");
  console.log(error);
}
}



    return(<>
       <div className=" h-screen w-full flex justify-center items-center">
        <div className="h-[90vh] w-[60vw]  sm:block hidden">
          <img
            className="h-full w-full object-contain"
            src="signIn.png"
            alt=""
          />{" "}
        </div>
        <div className=" h-[65vh] md:h-[90vh] md:w-[35vw] w-[100vw] flex justify-center items-center ">
          <form
          onSubmit={handleLogin}
            className="h-[50%] [&>input]:px-2 w-[80%] gap-6 rounded-lg shadow-[0_0_10px_2px_rgb(211,211,201)]  flex py-5 px-6 flex-col"
            action=""
          >
            <div className="flex justify-between items-center">
              <p className=" text-2xl md:text-3xl font-bold text-[#5a155a] flex gap-3">
                Let us Know <p className="text-red-500">!</p>
              </p>
              {/* <div onClick={()=>{setLog(!log);}} className="text-lg cursor-pointer font-semibold underline text-center flex ">
                Sign <p className="text-red-500">In</p>
              </div> */}
            </div>

           
            <input onChange={(e)=>{setLogUser({...logUser, email:e.target.value})}} value={logUser.email} className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="text" placeholder="Email" />
            <input onChange={(e)=>{setLogUser({...logUser,password:e.target.value})}}  value={logUser.password} className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="password" placeholder="Password" />
            <button type='submit' className="duration-200 h-[50px] rounded-xl text-white font-semibold w-full hover:text-[#491149] hover:bg-white hover:border  hover:border-[#491149] bg-[#491149]">Sign In</button>
            <button onClick={()=>{setLog(!log);}} className="duration-200 h-[50px] rounded-xl text-[#491149] border hover:text-white hover:bg-[#491149] border-[#491149] font-semibold w-full bg-white">Sign Up</button>


          </form>
        </div>
      </div>
    
    
    </>)
}