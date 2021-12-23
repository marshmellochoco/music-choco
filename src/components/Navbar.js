import Icon from "@mdi/react";
import {
    mdiArrowLeft,
    mdiHome,
    mdiMagnify,
    mdiMusicBoxMultiple,
} from "@mdi/js";
import logo from "../images/music-choco.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navbar = ({ resetToken, location }) => {
    const [searchbar, setSearchbar] = useState(false);
    const [query, setQuery] = useState("");
    const history = useHistory();

    useEffect(() => {
        setSearchbar(false);
        // eslint-disable-next-line
    }, [location]);

    const gotoHome = () => {
        history.push("/");
    };

    const search = () => {
        // TODO: Implement searching
        console.log(query);
    };

    return (
        <nav className="grid grid-cols-9 md:grid-cols-5 align-center gap-2 px-2 pt-4 pb-3 fixed top-0 left-0 w-full bg-white border-b">
            <div className="col-span-3 md:col-span-1 w-max">
                <Link to="/" className="w-min">
                    <img
                        src={logo}
                        alt="music-chcoo"
                        className="h-4 md:h-6 object-scale-down cursor-pointer m-0"
                        onClick={() => gotoHome()}
                    />{" "}
                </Link>
            </div>
            <div className="flex col-span-3 justify-center gap-4 sm:gap-8 h-9">
                <div
                    className={`border border-black w-full flex px-1 mx-8 items-center ${
                        !searchbar && "hidden"
                    }`}
                >
                    <Icon
                        path={mdiArrowLeft}
                        className="icon-small hover:opacity-100 border-r mr-2"
                        title="Go back"
                        onClick={() => setSearchbar(false)}
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full outline-none py-1"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") search();
                        }}
                    />
                    <Icon
                        path={mdiMagnify}
                        className="icon-small hover:opacity-100"
                        title="Search"
                        onClick={search}
                    />
                </div>
                {!searchbar && (
                    <>
                        <Link to="/" className="hover:opacity-60">
                            <Icon
                                path={mdiHome}
                                className="icon-small sm:hidden"
                                title="Home"
                            />
                            <span className="hidden sm:block">Home</span>
                        </Link>
                        <Link to="/library" className="hover:opacity-60">
                            <Icon
                                path={mdiMusicBoxMultiple}
                                className="icon-small sm:hidden"
                                title="Library"
                            />
                            <span className="hidden sm:block">Library</span>
                        </Link>
                        <span
                            className="flex hover:opacity-60 cursor-pointer"
                            onClick={() => setSearchbar(true)}
                        >
                            <Icon
                                path={mdiMagnify}
                                className="icon-small"
                                title="Search"
                            />
                            <span className="hidden sm:block">Search</span>
                        </span>
                    </>
                )}
            </div>
            <div
                className="ml-auto col-span-3 md:col-span-1 cursor-pointer"
                onClick={resetToken}
            >
                MarshChoco
            </div>
        </nav>
    );
};

export default Navbar;
