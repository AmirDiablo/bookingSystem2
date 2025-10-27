import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import { FaStar } from "react-icons/fa";
import timeFormat from "../lib/timeFormat";
import { FaRegHeart } from "react-icons/fa6";
import { FiPlayCircle } from "react-icons/fi";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
    const {id} = useParams()
    const [show, setShow] = useState(null);
    const navigate= useNavigate()
    const {shows, user, fetchFavoriteMovies, favorites, image_base_url} = useUser()

    const getShow = async ()=> {
        try {
            const response = await fetch(`http://localhost:3000/api/show/${id}`)
            const json = await response.json()

            if(json.success) {
                setShow(json)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFavorite = async ()=> {
        try {
            if(!user) return toast.error("Please login to proceed")
            
            const response = await fetch("http://localhost:3000/api/user/update-favorite", {
                method: "POST",
                body: JSON.stringify({movieId: id}),
                headers: {
                    "Authorization" : `Bearer ${user?.token}`,
                    "Content-Type" : "application/json"
                }
            })

            const json = await response.json()

            if(json.success) {
                await fetchFavoriteMovies()
                toast.success(json.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(show)

    useEffect(()=> {
        getShow()
    }, [id])

    return show ? ( 
        <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">

            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">

                <img src={image_base_url + show.movie.poster_path} alt="poster" className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover" />

                <div className="relative flex flex-col gap-3">
                    <BlurCircle top="-100px" left="-100px" />
                    <p className="text-primary">ENGLISH</p>
                    <h1 className="text-4xl font-semibold max-w-96 text-balance">{show.movie.title}</h1>
                    <div className="flex items-center gap-2 text-gray-300">
                        <FaStar className="w-5 h-5 text-primary fill-primary" />
                        {show.movie.vote_average.toFixed(1)} User Rating
                    </div>

                    <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{show.movie.overview}</p>

                    <p>
                        {timeFormat(show.movie.runtime)} • {show.movie.genres.slice(0,2).map(genre => genre).join("|")} • {show.movie.release_date.split("-")[0]}
                    </p>

                    <div className="flex items-center flex-wrap gap-4 mt-4">
                        <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
                            <FiPlayCircle className="w-5 h-5" />
                            Watch Trailer
                        </button>
                        <a href="#dateSelect" className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95">Buy Tiackets</a>
                        <button onClick={handleFavorite} className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
                            <FaRegHeart className={`w-5 h-5 ${favorites?.find((movie)=> movie._id === id) ? 'fill-primary text-primary' : ''}`} />
                        </button>
                    </div>

                </div>

            </div>

            <p className="text-lg font-medium mt-20">Your Favourite Cast</p>
            <div className="overflow-x-auto no-scrollbar pb-4 mt-8">
                <div className="flex items-center gap-4 w-max px-4">
                    {show.movie.casts.slice(0, 12).map((cast, index)=> (
                        <div key={index} className="flex flex-col items-center text-center">
                            <img src={image_base_url + cast.profile_path} alt="" className="rounded-full h-20 md:h-20 aspect-square object-cover"/>
                            <p className="font-medium text-xs mt-3">{cast.name}</p>
                        </div>
                    ))}
                </div>
            </div>


            <DateSelect dateTime={show.dateTime} id={id} />

            <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
            <div className="flex flex-wrap max-sm:justify-center gap-8">
                {shows.slice(0,4).map((movie, index)=> (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>

            <div className="flex justify-center mt-20">
                <button onClick={()=> {navigate("/movies"); scrollTo(0,0)}} className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-meduim cursor-pointer">
                    Show more
                </button>
            </div>

        </div>
     ) : (
        <Loading />
     );
}
 
export default MovieDetails;