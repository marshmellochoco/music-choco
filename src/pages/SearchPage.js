import { useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiClose } from "@mdi/js";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";
import TrackItem from "../components/Tracks/TrackItem";
import TrackHeader from "../components/Tracks/TrackHeader";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const search = () => {
        if (query !== "") {
            setIsLoading(true);
            axios
                .get(`${process.env.REACT_APP_API_URL}/search/${query}`)
                .then((res) => {
                    setData(res.data);
                    setIsLoading(false);
                });
        }
    };

    return (
        <div className="page-content">
            <h1 className="title">Search</h1>
            <div>
                <div className="border flex px-2 py-1 items-center">
                    <div className="rounded-full hover:bg-red-100">
                        <Icon path={mdiArrowLeft} className="icon-small" />
                    </div>
                    <input
                        type="text"
                        className="w-full py-0.5 px-1"
                        autoFocus={true}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") search();
                        }}
                    />
                    <div className="rounded-full hover:bg-red-100">
                        <Icon path={mdiClose} className="icon-small" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {isLoading && (
                    <div className="flex h-full justify-center mt-8">
                        <div className="loader" />
                    </div>
                )}
                {!isLoading && data && data.tracks.length > 0 && (
                    <div>
                        <h2 className="title2">Tracks</h2>
                        <div>
                            <TrackHeader album={true} />
                            {data.tracks.map((t, i) => (
                                <TrackItem i={i + 1} t={t} album={true} />
                            ))}
                        </div>
                    </div>
                )}
                {!isLoading && data && data.artists.length > 0 && (
                    <div>
                        <h2 className="title2">Artists</h2>
                        <div className="card-list">
                            {data.artists.map((a) => (
                                <ArtistCard
                                    artist={a}
                                    key={`artist_${a._id}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!isLoading && data && data.albums.length > 0 && (
                    <div>
                        <h2 className="title2">Albums</h2>
                        <div className="card-list">
                            {data.albums.map((a) => (
                                <AlbumCard album={a} key={`album_${a._id}`} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
