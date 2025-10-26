import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import { FiSearch } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { useUser } from "../context/userContext";
import UserButton from "./UserButton";

const Navbar = () => {
    const {user} = useUser()
    const [isOpen, setIsOpen] = useState(false);
    const [loginisOpen, setLoginisOpen] = useState(false);
    const [signUpisOpen, setSignUpisOpen] = useState(false);
    const [userButtonIsOpen, setUserButtonIsOpen] = useState(false);

    return ( 
        <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 md:px-16 lg:px-36 py-5">
            <Link to="/" className="max-md:flex-1">
                <img src={logo} alt="logo" className="w-36 h-auto"/>
            </Link>

            <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
                <RxCross1 onClick={()=> setIsOpen(false)} className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" />


                <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/">Home</Link>
                <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/movies" className="ml-8">Movies</Link>
                <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/theaters" className="ml-8">Theaters</Link>
                <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/releases" className="ml-8">Releases</Link>
                <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/favourite" className="ml-8">Favourite</Link>
            </div>

            <div className="flex items-center gap-8">
                <FiSearch className="max-md:hidden w-6 h-6 cursor-pointer" />
                { user ?
                    <img onClick={()=> setUserButtonIsOpen(!userButtonIsOpen)} src={user?.userInfo[0]?.avatar} className="w-10 cursor-pointer rounded-full object-cover" alt="avatar" /> : 
                    <button onClick={()=> setLoginisOpen(true)} className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
                        Login
                    </button>
                }

                { userButtonIsOpen ? <UserButton setUserButtonIsOpen={setUserButtonIsOpen} /> : null }
            </div>

            
            {loginisOpen ? <Login setLoginisOpen={setLoginisOpen} setSignUpisOpen={setSignUpisOpen}/> : null}
            {loginisOpen ? <div className="bg-black/50 w-screen h-screen fixed top-0 bottom-0 left-0 right-0"></div> : null }

            {signUpisOpen ? <SignUp setLoginisOpen={setLoginisOpen} setSignUpisOpen={setSignUpisOpen}/> : null}
            {signUpisOpen ? <div className="bg-black/50 w-screen h-screen fixed top-0 bottom-0 left-0 right-0"></div> : null }

            <CiMenuFries onClick={()=> setIsOpen(!isOpen)} className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" />

        </div>
     );
}
 
export default Navbar;