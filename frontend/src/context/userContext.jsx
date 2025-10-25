import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserContext = createContext()

export const UserProvider = ({ children })=> {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState()
    const [userId, setUserId] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favorites, setFavorites] = useState([])

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

    const updateProfile = (obj)=> {
        setUser([obj])
    }

    const login = (value)=> {
        setUserId(value)
    }

    const logout = ()=> {
        localStorage.removeItem("user")
        setUser(null)
        setUserId(null)
    }

    const fetchIsAdmin = async ()=> {
        try{
            const response = await fetch("http://localhost:3000/api/admin/is-admin", {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${user?.token}`
                }
            })

            const json = await response.json()

            setIsAdmin(json.isAdmin)

            if(!json.isAdmin && location.pathname.startsWith("/admin")) {
                navigate("/")
                toast.error("you can not access to admin dashboard")
            }
        } catch (error) {
            console.error(error)
        }
    } 


    const fetchShows = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/show/all") 

            const json = await response.json()

            if(json.success) {
                setShows(json.shows)
            }else{
                toast.error(json.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const fetchFavoriteMovies = async ()=> {
        try{
            const response = await fetch("http://localhost:3000/api/user/favorites", {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${user?.token}`
                }
            })

            const json = await response.json()

            if(json.success) {
                setFavorites(json.favoritesWithMovies)
            }else{
                toast.error(json.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))

        const fetchUser = async (id)=> {
            const response = await fetch("http://localhost:3000/api/user/userInfo?q="+id)
            const json = await response.json()

            if(response.ok) {
                setUser({token: user.token, userInfo: json})
            }
        }

        if (user) {
            fetchUser(user.id)
        }

    }, [ ,userId])

    useEffect(()=> {
        if(user) {
            fetchIsAdmin()
            fetchFavoriteMovies()
        }
    }, [user])

    useEffect(()=> {
        fetchShows()
    }, [])

    console.log("user from context: ", user);
    
    return (
        <UserContext.Provider value={{user, setUser, login, updateProfile, logout, shows, fetchFavoriteMovies, fetchIsAdmin, fetchShows, isAdmin, image_base_url, favorites}}>
            {children}
        </UserContext.Provider>
    )
}

//hook
export const useUser = ()=> {
    return useContext(UserContext)
}