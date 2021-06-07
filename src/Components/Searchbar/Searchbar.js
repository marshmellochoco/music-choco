// component import
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import "./Searchbar.css";

export const Searchbar = ({ handleSearch }) => {
    return (
        <div className="search">
            <Icon path={mdiMagnify} className="icon" />
            <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
            ></input>
        </div>
    );
};
