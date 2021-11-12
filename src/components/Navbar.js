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

const Navbar = () => {
    const [searchbar, setSearchbar] = useState(false);

    return (
        <nav className="grid grid-cols-5 px-2 pt-4 pb-3 fixed top-0 left-0 w-full bg-white border-b">
            <Link to="/">
                <img
                    src={logo}
                    alt="music-chcoo"
                    className="h-8 object-scale-down"
                />
            </Link>
            <div className="flex col-span-3 justify-center gap-8 h-8">
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
            <div className="ml-auto">MarshChoco</div>
        </nav>
    );
};

export default Navbar;
