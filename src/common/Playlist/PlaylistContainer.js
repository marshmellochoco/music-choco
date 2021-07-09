import { getPlaylistList } from "../../api";
import { PlaylistComponent } from "./PlaylistComponent";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const PlaylistContainer = () => {
    const authToken = useSelector((state) => state.authReducer.token);
    const [playlistList, setPlaylistList] = useState([]);

    useEffect(() => {
        getPlaylistList(authToken).then((res) => setPlaylistList(res.data));
    }, []);

    return <PlaylistComponent playlistList={playlistList} />;
};
