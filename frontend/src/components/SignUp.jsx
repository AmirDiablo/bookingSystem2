import React from "react";
import GoogleButton from "./GoogleButton";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useUser } from "../context/userContext";

const SignUp = ({setLoginisOpen, setSignUpisOpen}) => {
    const {login} = useUser()
    const [formNumber, setFormNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(null)
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('')


    const startCountdown = () => {
        setResendDisabled(true);
        let seconds = 60;
        setCountdown(seconds);
        
        const timer = setInterval(() => {
        seconds -= 1;
        setCountdown(seconds);
        
        if (seconds <= 0) {
            clearInterval(timer);
            setResendDisabled(false);
        }
        }, 1000);
    };

    const handleContinue =  async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/verification/send-code', {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    "Content-Type" : "application/json"
                }
            })

            const json = await response.json()

            if(response.ok) {
                setFormNumber(2);
                startCountdown();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error sending verification code');
        } finally {
            setLoading(false);
        }
    }

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/verification/verify-code', {
                method: "POST",
                body: JSON.stringify({code, email}),
                headers: {
                    "Content-Type" : "application/json"
                }
            });

            const json = await response.json()

            if(response.ok) {
                setFormNumber(3);
            }
            
        } catch (err) {
            setError(err.response?.data?.error || 'خطا در تأیید کد');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/api/verification/send-code', { email });
      startCountdown();
    } catch (err) {
      setError(err.response?.data?.error || 'خطا در ارسال مجدد کد');
    } finally {
      setLoading(false);
    }
    };

    const createAccount = async(e)=> {
        e.preventDefault()
    
        const response = await fetch("http://localhost:3000/api/user/signup", {
            method: "POST",
            body: JSON.stringify({username, email, password}),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        const json = await response.json()

        if(response.ok) {
            setError(null)
            setLoading(false)
            localStorage.setItem("user", JSON.stringify(json))
            login(json._id)
            setSignUpisOpen(false)
        }
        if(!response.ok) {
            console.log(json.error)
            setError(json.error)
            setLoading(false)
        }
    }

    return ( 
        <div>

            {formNumber == 1 && 
                <div className="bg-white text-black rounded-2xl p-8 flex flex-col gap-6 w-[350px] max-sm:w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
                    <RxCross1 onClick={()=> setSignUpisOpen(false)} className="w-5 h-5 cursor-pointer absolute top-4 right-4 text-black/40" />

                    <p className="text-center font-[600]">Sign up to QuickShow</p>
                    <p className="text-black/40 text-[15px] text-center">Welcome! please sign up to continue</p>
                    <div className="mx-auto"><GoogleButton /></div>

                    <div className="h-[1px] bg-black/20 w-[100%]"></div>
                    <p className="text-black/40 text-center">or</p>

                    <div>
                        <label className="text-[15px]">Email address</label>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder="enter your email address" className="border-[1px] border-black/40 py-1 px-2 rounded-[7px] w-[100%] mb-2" />
                    </div>

                    <button onClick={handleContinue} className="bg-black/80 cursor-pointer text-white rounded-[7px] py-1">Continue</button>

                    <div className="text-center flex items-center justify-center"><p className="text-black/40 text-[15px]">don't have an account?</p> <Link onClick={()=> {setLoginisOpen(true), setSignUpisOpen(false)}}>Log in</Link></div>
                </div>
            }

            {formNumber == 2 && 
                <div className="bg-white text-black rounded-2xl p-8 flex flex-col gap-6 w-[350px] max-sm:w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
                    <RxCross1 onClick={()=> setSignUpisOpen(false)} className="w-5 h-5 cursor-pointer absolute top-4 right-4 text-black/40" />

                    <p className="text-center font-[600]">Sign up to QuickShow</p>
                    <p className="text-black/40 text-[15px] text-center">Welcome! please sign up to continue</p>

                    <div className="h-[1px] bg-black/20 w-[100%]"></div>

                    <div>
                        <label className="text-[15px]">Verification Code</label>
                        <input onChange={(e)=> setCode(e.target.value)} value={code} type="number" placeholder="enter verification code" className="border-[1px] border-black/40 py-1 px-2 rounded-[7px] w-[100%] mb-2" />
                    </div>

                    <button type="button" 
                        onClick={handleResendCode} 
                        disabled={resendDisabled || loading}
                        className="text-orange-500">{resendDisabled ? `Resend (${countdown})` : 'Resend Code'}
                    </button>

                    <button onClick={handleCodeSubmit} className="bg-black/80 cursor-pointer text-white rounded-[7px] py-1">Submit code</button>

                    <div className="text-center flex items-center justify-center"><p className="text-black/40 text-[15px]">don't have an account?</p> <Link onClick={()=> {setLoginisOpen(true), setSignUpisOpen(false)}}>Log in</Link></div>
                </div>
            }

            {formNumber == 3 && 
                <div className="bg-white text-black rounded-2xl p-8 flex flex-col gap-6 w-[350px] max-sm:w-[90%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
                    <RxCross1 onClick={()=> setSignUpisOpen(false)} className="w-5 h-5 cursor-pointer absolute top-4 right-4 text-black/40" />

                    <p className="text-center font-[600]">Sign up to QuickShow</p>
                    <p className="text-black/40 text-[15px] text-center">Welcome! please sign up to continue</p>

                    <div className="h-[1px] bg-black/20 w-[100%]"></div>

                    <div>
                        <label className="text-[15px]">Password</label>
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="text" placeholder="enter your password" className="border-[1px] border-black/40 py-1 px-2 rounded-[7px] w-[100%] mb-2" />
                        <label className="text-[15px]">Username</label>
                        <input onChange={(e)=> setUsername(e.target.value)} value={username} type="text" placeholder="enter your username" className="border-[1px] border-black/40 py-1 px-2 rounded-[7px] w-[100%]" />
                    </div>

                    <button onClick={createAccount} className="bg-black/80 cursor-pointer text-white rounded-[7px] py-1">Create account</button>

                    <div className="text-center flex items-center justify-center"><p className="text-black/40 text-[15px]">don't have an account?</p> <Link onClick={()=> {setLoginisOpen(true), setSignUpisOpen(false)}}>Log in</Link></div>
                </div>
            }

        </div>
     );
}
 
export default SignUp;