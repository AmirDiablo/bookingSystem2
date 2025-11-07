import SettingSidebar from "../components/SettingSidebar";
import Sessions from "./Sessions";
import EdditProfile from "./EditProfile";
import { Outlet } from "react-router-dom";

const ManageAccount = () => {
    return ( 
        <>

            <div className="flex mt-20">
                <SettingSidebar />
                <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
                    <Outlet />
                </div>
            </div>


        </>
     );
}
 
export default ManageAccount;