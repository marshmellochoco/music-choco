import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "@mdi/react";
import { mdiHome, mdiMagnify, mdiMusicBoxMultiple } from "@mdi/js";
import logo from "../images/music-choco.png";

const Navbar = ({ resetToken }) => {
    const { displayName } = useSelector((state) => state.userReducer);

    return (
        <>
        <div className="navbar-placeholder"></div>
        <div className="navbar">
            <Link to="/" className="nav-logo w-min" title="music-choco">
                <img src={logo} alt="music-chcoo" />
            </Link>

            <div className="nav-items">
                <Link to="/" className="nav-item">
                    <Icon path={mdiHome} className="sm:hidden" title="Home" />
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
                <Link to="/search" className="nav-item">
                    <Icon
                        path={mdiMagnify}
                        className="sm:hidden"
                        title="Search"
                    />
                    <span className="hidden sm:block">Search</span>
                </Link>
            </div>
            <div className="nav-user" onClick={resetToken}>
                {displayName}
            </div>
        </div>
        </>
    );
};

export default Navbar;
// TODO: user dropdown
