import Icon from "@mdi/react";
import {
    mdiArrowLeft,
    mdiHome,
    mdiMagnify,
    mdiMusicBoxMultiple,
} from "@mdi/js";
import logo from "../images/music-choco.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({resetToken}) => {
    const [searchbar, setSearchbar] = useState(false);

    const logout = () => {
        window.location.reload();
        resetToken();
    }

    return (
        <nav className="grid grid-cols-9 md:grid-cols-5 align-center gap-2 px-2 pt-4 pb-3 fixed top-0 left-0 w-full bg-white border-b">
            <Link to="/" className="col-span-3 md:col-span-1">
                <img
                    src={logo}
                    alt="music-chcoo"
                    className="h-4 md:h-6 object-scale-down"
                />
            </Link>
            <div className="flex col-span-3 justify-center gap-4 sm:gap-8 h-8">
                {searchbar ? (
                    <div className="border border-black w-full flex px-1 mx-8">
                        <Icon
                            path={mdiArrowLeft}
                            className="icon-small hover:opacity-100 border-r mr-2"
                            onClick={() => setSearchbar(false)}
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full outline-none"
                        />
                        <Icon
                            path={mdiMagnify}
                            className="icon-small hover:opacity-100"
                        />
                    </div>
                ) : (
                    <>
                        <Link to="/" className="hover:opacity-60">
                            <Icon
                                path={mdiHome}
                                className="icon-small hover:opacity-100 sm:hidden"
                            />
                            <span className="hidden sm:block">Home</span>
                        </Link>
                        <Link to="/library" className="hover:opacity-60">
                            <Icon
                                path={mdiMusicBoxMultiple}
                                className="icon-small hover:opacity-100 sm:hidden"
                            />
                            <span className="hidden sm:block">Library</span>
                        </Link>
                        <span
                            className="flex hover:opacity-60 cursor-pointer"
                            onClick={() => setSearchbar(true)}
                        >
                            <Icon
                                path={mdiMagnify}
                                className="icon-small hover:opacity-100"
                            />
                            <span className="hidden sm:block">Search</span>
                        </span>
                    </>
                )}
            </div>
            <div className="ml-auto col-span-3 md:col-span-1" onClick={logout}>MarshChoco</div>
        </nav>
    );
};

export default Navbar;
