import { useUser } from "../context/userContext";
import { IoMdSettings } from "react-icons/io";
import { LuTicketPlus } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";

const UserButton = () => {
    const {user} = useUser()

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
                <div><IoMdSettings /> <p>Manage account</p></div>
                <div><LuTicketPlus /> <p>My Bookings</p></div>
                <div><HiOutlineLogout /> <p>Log out</p></div>
                <div><AiOutlinePlus /> <p>Add account</p></div>
            </div>

        </div>
     );
}
 
export default UserButton;