import { FaPlusSquare } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuList } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { useUser } from "../context/userContext";

const SettingSidebar = () => {

    const {user} = useUser()

    const SettingNavLinks = [
        {name: 'Edit Profile', path: '/manageAccount', icon: IoSettingsOutline},
        {name: 'Sessions', path: '/manageAccount/sessions', icon: LuList},
    ]

    return ( 
        <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
            <img src={user?.userInfo[0]?.avatar} alt="sideBar" className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto" />
            <p className="mt-2 text-base max-md:hidden">{user?.userInfo[0]?.username}</p>

            <div className="w-full">
                {SettingNavLinks.map((link, index) => (
                    <NavLink end key={index} to={link.path} className={({ isActive })=> `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
                        {({isActive}) => (
                            <>
                                <link.icon className="w-5 h-5" />
                                <p className="max-md:hidden">{link.name}</p>
                                <span className={`w-1.5 h-10 rounded-1 right-0 absolute ${isActive && 'bg-primary'}`}></span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
     );
}
 
export default SettingSidebar;