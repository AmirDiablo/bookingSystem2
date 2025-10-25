import React from "react";
import GoogleButton from "./GoogleButton";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useUser } from "../context/userContext";

const Login = ({setLoginisOpen, setSignUpisOpen}) => {
    const {login} = useUser()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit =  async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/user/login", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const json = await response.json()

        if(response.ok) {
            localStorage.setItem("user", JSON.stringify(json))
            login(json._id)
            setLoginisOpen(false)
        }
    }

    return ( 
        <div className="bg-white text-black rounded-2xl p-8 flex flex-col gap-6 w-[350px] max-sm:w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
            <RxCross1 onClick={()=> setLoginisOpen(false)} className="w-5 h-5 cursor-pointer absolute top-4 right-4 text-black/40" />

            <p className="text-center font-[600]">Sign in to QuickShow</p>
            <p className="text-black/40 text-[15px] text-center">Welcome back! please sign in to continue</p>
            <div className="mx-auto"><GoogleButton /></div>

            <div className="h-[1px] bg-black/20 w-[100%]"></div>
            <p className="text-black/40 text-center">or</p>

            <div>
                <label className="text-[15px]">Email address</label>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder="enter your email address" className="border-[1px] border-black/40 py-1 px-2 rounded-[7px] w-[100%] mb-2" />
                <label className="text-[15px]">Password</label>
                <input onChange={(e)=> setPassword(e.target.value)} value={[password]} type="text" placeholder="enter your account password" className="border-[1px] border-black/40 py-1 px-2 rounded-[7px] w-[100%]" />
            </div>

            <button onClick={handleSubmit} className="bg-black/80 cursor-pointer text-white rounded-[7px] py-1">Log in</button>

            <div className="text-center flex items-center justify-center"><p className="text-black/40 text-[15px]">don't have an account?</p> <Link onClick={()=> {setSignUpisOpen(true), setLoginisOpen(false)}}>Sign up</Link></div>
        </div>
     );
}
 
export default Login;