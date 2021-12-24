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
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/" className="w-min">
                    <img
                        src={logo}
                        alt="music-chcoo"
                        onClick={() => gotoHome()}
                    />
                </Link>
            </div>
            <div className="nav-items">
                {searchbar ? (
                    <div className="searchbar">
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
                            defaultValue={query}
                            autoFocus={true}
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
                ) : (
                    <>
                        <Link to="/" className="nav-item">
                            <Icon
                                path={mdiHome}
                                className="sm:hidden"
                                title="Home"
                            />
                            <span className="hidden sm:block">Home</span>
                        </Link>
                        <Link to="/library" className="nav-item">
                            <Icon
                                path={mdiMusicBoxMultiple}
                                className="sm:hidden"
                                title="Library"
                            />
                            <span className="hidden sm:block">Library</span>
                        </Link>
                        <span
                            className="nav-item flex items-center"
                            onClick={() => setSearchbar(true)}
                        >
                            <Icon path={mdiMagnify} title="Search" />
                            <span className="hidden sm:block">Search</span>
                        </span>
                    </>
                )}
            </div>
            <div className="nav-user" onClick={resetToken}>
                MarshChoco
            </div>
        </nav>
    );
};

export default Navbar;
