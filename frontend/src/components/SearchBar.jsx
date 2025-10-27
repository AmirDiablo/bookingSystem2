import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const [result, setResult] = useState([])
    const navigate = useNavigate()

    return ( 
        
        <div className="flex items-center justify-between h-2 w-[calc(100vw-50px)] min-md:w-[40%] z-51 fixed top-20 min-md:top-7 left-[50%] -translate-x-[50%]">
            <div onClick={()=> navigate(`/result?query=${query}`)} className="bg-red-400 p-1.5 min-md:p-2.5 text-3xl rounded-l-3xl h-max"><FiSearch /></div>
            <input type="search" className="w-[100%] py-2 min-md:py-3 px-3 text-black bg-white rounded-r-3xl" onChange={(e)=> setQuery(e.target.value)} value={query} />
        </div>
            
     );
}
 
export default SearchBar;