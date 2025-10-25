import { FaPlusSquare } from "react-icons/fa";
import { LuLayoutDashboard, LuList, LuListCollapse } from "react-icons/lu";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import React from "react";
import { FiPlusSquare } from "react-icons/fi";

const AdminSidebar = () => {

    const user = {
        firstname: "Admin",
        lastname: "User",
        imageUrl: assets.profile
    }

    const adminNavLinks = [
        {name: 'Dashboard', path: '/admin', icon: LuLayoutDashboard},
        {name: 'Add Shows', path: '/admin/add-shows', icon: FiPlusSquare},
        {name: 'List Shows', path: '/admin/list-shows', icon: LuList},
        {name: 'List Bookings', path: '/admin/list-bookings', icon: LuListCollapse},  
    ]

    return ( 
        <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
            <img src={user.imageUrl} alt="sideBar" className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto" />
            <p className="mt-2 text-base max-md:hidden">{user.firstname} {user.lastname}</p>

            <div className="w-full">
                {adminNavLinks.map((link, index) => (
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
 
export default AdminSidebar;