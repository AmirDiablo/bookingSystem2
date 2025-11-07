import { useUser } from "../context/userContext";
import { IoMdSettings } from "react-icons/io";
import { LuTicketPlus } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "./SignUp"

const UserButton = ({setUserButtonIsOpen}) => {
    const {user, logout} = useUser()
    const [signUpisOpen, setSignUpisOpen] = useState(false)
    const [loginisOpen, setLoginisOpen] = useState(false)

    return ( 
        <div className="fixed text-[13px] top-16 right-10 w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 z-50 text-black">
            <div className="flex items-center gap-3">
                <img src={user?.userInfo[0]?.avatar} alt="avatar" className="w-10 rounded-full object-cover" />
                <div>
                    <p className="font-[600]">{user?.userInfo[0]?.username}</p>
                    <p className="text-black/60">{user?.userInfo[0]?.email}</p>
                </div>
            </div>

            <div className="flex flex-col *:ml-3 gap-3 *:flex *:items-center *:gap-3 *:cursor-pointer *:text-black/70">
                <Link to="/manageAccount"><IoMdSettings /> <p>Manage account</p></Link>
                <Link to="/my-bookings"><LuTicketPlus /> <p>My Bookings</p></Link>
                <div onClick={()=> {logout(), setUserButtonIsOpen(false)}}><HiOutlineLogout /> <p>Log out</p></div>
                <div onClick={()=> setSignUpisOpen(true)}><AiOutlinePlus /> <p>Add account</p></div>
            </div>

            {loginisOpen ? <Login setLoginisOpen={setLoginisOpen} setSignUpisOpen={setSignUpisOpen}/> : null}
            {loginisOpen ? <div className="bg-black/50 w-screen h-screen fixed top-0 bottom-0 left-0 right-0"></div> : null }

            {signUpisOpen ? <SignUp setLoginisOpen={setLoginisOpen} setSignUpisOpen={setSignUpisOpen}/> : null}
            {signUpisOpen ? <div className="bg-black/50 w-screen h-screen fixed top-0 bottom-0 left-0 right-0"></div> : null }

        </div>
     );
}
 
export default UserButton;