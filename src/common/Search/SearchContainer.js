import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchComponent } from "./SearchComponent";
import { setPlayingSong } from "../../store/actions/songDataAction";
import { addQueue, setQueue } from "../../store/actions/queueAction";
import { setPlaying } from "../../store/actions/playerActions";

export const SearchContainer = ({ search }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const imageUrl = `${apiUrl}/album/ico/`;
    const [albumSearch, setAlbumSearch] = useState([]);
    const [songSearch, setSongSearch] = useState([]);
    const playingSong = useSelector(
        (state) => state.songDataReducer.songData.songId
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (search && search !== "") {
            axios
                .get(`${apiUrl}/album/search/${search}`)
                .then((result) => setAlbumSearch(result.data))
                .catch((e) => setAlbumSearch([]));

            axios
                .get(`${apiUrl}/song/search/${search}`)
                .then((result) => setSongSearch(result.data))
                .catch((e) => setSongSearch([]));
        }
    }, [search, apiUrl]);

    const playSong = (id) => {
        dispatch(addQueue(id));
        dispatch(setPlayingSong(id));
        dispatch(setPlaying(true));
    };

    const addSong = (id) => {
        // add the song to the queue
        dispatch(addQueue(id));
    };

    const handleImageError = (e) => {
        // return an alternate image if error
        e.target.src = "https://f4.bcbits.com/img/a4139357031_10.jpg";
    };

    const handlePlayAlbum = async (id) => {
        // play the entire album associated with the card, replace the existing queue with the album list
        var songListData = [];
        await axios
            .get(`${apiUrl}/album/${id}`)
            .then((res) => (songListData = res.data.songs))
            .catch((e) => (songListData = []));

        var songList = [];
        songListData.forEach((s) => {
            songList.push(s._id);
        });

        dispatch(setPlayingSong(songList[0]));
        dispatch(setPlaying(true));
        dispatch(setQueue(songList));
    };

    return (
        <SearchComponent
            imageUrl={imageUrl}
            search={search}
            playingSong={playingSong}
            albumSearch={albumSearch}
            songSearch={songSearch}
            playSong={playSong}
            addSong={addSong}
            handleImageError={handleImageError}
            handlePlayAlbum={handlePlayAlbum}
        />
    );
};
