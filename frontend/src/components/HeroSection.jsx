import { SlCalender } from "react-icons/sl";
import { LuClock3 } from "react-icons/lu";
import HeroBackground from '../assets/backgroundImage.png';
import marvelLogo from '../assets/marvelLogo.svg';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate()

    return ( 
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen' style={{background: `url(${HeroBackground})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <img src={marvelLogo} className="max-h-11 lg:h-11 mt-20" alt="Marvel Logo" />

            <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110">Gaurdians <br /> of the Galaxy</h1>

            <div className="flex items-center gap-4 text-gray-300">
                <span>Action | Adventure | Sci-Fi</span>
                <div className="flex items-center gap-1">
                    <SlCalender className=" w-4.5 h-4.5" /> 2018
                </div>

                <div className="flex items-center gap-1">
                    <LuClock3 className=" w-4.5 h-4.5" /> 2h 8m
                </div>
            </div>

            <p className="max-w-md text-gray-300">
                In a post-apocalyptic world where cities ride on wheels
                and consume each other to survive, two people meet in
                London and try to stop a conspiracy.
            </p>
            <button onClick={()=> navigate("/movies")} className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
                Explore Movies <FaArrowRight className="w-5 h-5" />
            </button>

        </div>
     );
}
 
export default HeroSection;