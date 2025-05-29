import logo from "../assets/logo.png";
import search from "../assets/search.png";
import location from "../assets/location.png";
import { useState } from "react";

const NavBar = ({ onCitySearch, onLocationFetch }) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const handlesearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            onCitySearch(searchQuery);
            setSearchQuery("");
        }
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {

                const { latitude, longitude } = pos.coords;
                onLocationFetch(latitude, longitude);
                setSearchQuery("");
            }, (error => {
                console.error("Error getting location:", error);
                toast.error("Unable to retrieve location.");
            }))
        }
    }

    return (
        <div className="m-4">
            <div className="flex items-center justify-between gap-4">
                {/* logo */}
                <img src={logo} alt="logo" className="w-20 select-none" height={10} width={20} />

                {/* searchbar */}
                <form onSubmit={handlesearchSubmit} className="relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md">
                    <img src={search} alt="search" className="absolute left-3 w-4 h-4 text-gray-400 select-none" height={20} width={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for your preferred city"
                        className="w-full py-2 pl-10 pr-4 text-sm text-black placeholder-black border-none rounded-lg outline-none"
                    />
                    <button type='submit' className="bg-[#050e1fde] text-white px-5 py-2 shadow-black shadow-md hover:bg-gray-600 transition duration-300">
                        Search
                    </button>
                </form>

                {/* current location */}
                <div onClick={handleLocationClick} className="flex items-center gap-3 px-5 py-2 text-lg font-medium text-white bg-[#050e1fde] rounded cursor-pointer hover:bg-gray-600 transition duration-300">
                    <img src={location} alt="location" height={20} width={20} />
                    <p>Current location</p>
                </div>
            </div>
        </div>
    );
};

export default NavBar;