import React from 'react';
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useState } from "react";
export default function Home(){
    const [log,setLog]= useState(false);

    return(
        <>
         { log?<SignIn log={log} setLog={setLog}/>: <SignUp log={log} setLog={setLog}/>
}
   
        </>
    )
}