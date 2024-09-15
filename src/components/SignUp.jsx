import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function SignUp({log,setLog}){
    const navigate = useNavigate();

    const initialSignup = { firstname: "", lastname:"", password: "", email: "",confirm:""};
    const [signUser, setSignUser] = useState(initialSignup);
    const [errorMessage, setErrorMessage] = useState("");
   
    var token_key = "";


    const handleSubmit = async (e) => {
        e.preventDefault();
    if(signUser.password === signUser.confirm){
        try {
          const response = await axios.post("http://localhost:5000/User/NewUser", {
            firstname: signUser.firstname,
            lastname: signUser.lastname,
            password: signUser.password,
            email: signUser.email,
          });
          console.log(response);
         
          alert("User Created");
          token_key = JSON.stringify(response.data);
          localStorage.setItem("Userdata", token_key);
          navigate("/verification")
        } catch (error) {
          console.log(error);
        }
    }
    else{
        setErrorMessage("please confirm passord");
    }
      };

      function handleSignChangePassword(e) {
        let new_pass = e.target.value;
        setSignUser({ ...signUser, password: new_pass });
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
    
        if (!new_pass.match(lowerCase)) {
          setErrorMessage("Passowrd should contain LowerCase letters");
        } else if (!new_pass.match(upperCase)) {
          setErrorMessage("Passowrd should contain UpperCase letters");
        } else if (!new_pass.match(numbers)) {
          setErrorMessage("Passowrd should contain numbers");
        } else if (new_pass.length < 8) {
          setErrorMessage("Passowrd should contain Weak password");
        } else {
          setErrorMessage("");
        }
      }

    return(
        <>
           <div className=" h-screen w-full flex justify-center items-center">
        <div className="h-[90vh] w-[60vw]  sm:block hidden">
          <img
            className="h-full w-full object-contain"
            src="unnamed.png"
            alt=""
          />{" "}
        </div>
        <div className=" h-[65vh] md:h-[90vh] md:w-[35vw] w-[100vw] flex justify-center items-center ">
          <form
            className="h-[90%] [&>input]:px-2 w-[80%] gap-6 rounded-lg shadow-[0_0_10px_2px_rgb(211,211,201)]  flex py-5 px-6 flex-col"
          >
            <div className="flex justify-between items-center">
              <p className=" text-3xl font-bold text-[#5a155a] flex gap-3">
                Let us Know <p className="text-red-500">!</p>
              </p>
              <div onClick={()=>{setLog(!log);}} className="text-lg cursor-pointer font-semibold underline text-center flex ">
                Sign <p className="text-red-500">In</p>
              </div>
            </div>

            <input required onChange={(e)=>{  setSignUser({ ...signUser, firstname: e.target.value});}}
                    value={signUser.firstname}  className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="text" placeholder="First Name" />
            <input required onChange={(e)=>{  setSignUser({ ...signUser,lastname:e.target.value });}}
                    value={signUser.lastname} className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="text"  placeholder="Last Name" />
            <input required onChange={handleSignChangePassword} value={signUser.password}  className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="password"  placeholder="Set Password" />
            <div
                    className={`text-[red] text-xl backdrop-blur-md ${
                      errorMessage === "" ? `hidden` : `block`
                    }  `}
                  >
                    {errorMessage}
                  </div>
            <input required onChange={(e)=>{setSignUser({...signUser,confirm:e.target.value})}} value={signUser.confirm} className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="password" placeholder="Retype Password" />
            <input className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="text" placeholder="Contact Mode" />
            <input required onChange={(e)=>{setSignUser({...signUser,email:e.target.value})}} value={signUser.email} className="h-[40px] w-full border-b-2 rounded-sm border-slate-300" type="text"placeholder="Email" />
            <button onClick={handleSubmit} className="duration-200 text-center py-2 h-[50px] rounded-xl hover:bg-white hover:border hover:border-[#491149] hover:text-[#491149] text-white font-semibold w-full bg-[#491149]">Sign Up</button>


          </form>
        </div>
      </div>
        </>
    )
}