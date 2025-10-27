import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const Result = () => {
    const [result, setResult] = useState([])
    const query = useLocation().search.split('=')[1]

    const search = async ()=> {
        const response = await fetch("http://localhost:3000/api/show/search/"+query)
        const json = await response.json()

        if(json.success) {
            setResult(json.results)
        }

    }

    useEffect(()=> {
        search()
    }, [query])

    return ( 
        <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl-px-44 overflow-hidden min-h-[80vh]">

            <div className="flex flex-wrap max-sm:justify-between gap-8 mt-8">
                {result.map(item=> (
                    <MovieCard key={item._id} movie={item} />
                ))}
            </div>
            
        </div>
     );
}
 
export default Result;