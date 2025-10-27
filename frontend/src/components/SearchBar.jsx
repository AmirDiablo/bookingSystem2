import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [query, setQuery] = useState("")

    const search = async ()=> {
        const response = await fetch("http://localhost:3000/api/show/search/"+query)
        const json = await response.json()

        
    }

    return ( 
        
        <div className="flex items-center justify-between h-2 w-[calc(100vw-50px)] min-md:w-[40%] z-51 fixed top-20 min-md:top-7 left-[50%] -translate-x-[50%]">
            <div onClick={search} className="bg-red-400 p-1.5 min-md:p-2.5 text-3xl rounded-l-3xl h-max"><FiSearch /></div>
            <input type="search" className="w-[100%] py-2 min-md:py-3 px-3 text-black bg-white rounded-r-3xl" onChange={(e)=> setQuery(e.target.value)} value={query} />
        </div>
            
     );
}
 
export default SearchBar;