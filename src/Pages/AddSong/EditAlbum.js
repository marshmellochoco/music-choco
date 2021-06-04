// dependancy import
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// component import
import { AddSong } from "../AddSong/AddSong";

export const EditAlbum = ({ apiUrl }) => {
    const [albumList, setAlbumList] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        const getAlbumData = async () => {
            var data = [];
            await axios.get(`${apiUrl}/album`).then((result) => {
                result.data.forEach((d) => {
                    data.push(d);
                });
            });
            setAlbumList(data);
            if (!selectedAlbum) {
                setSelectedAlbum(data[0]);
            }
        };

        getAlbumData();
    }, [apiUrl, selectedAlbum]);

    const getAlbumList = () => {
        return albumList.map((a, i) => {
            return <option>{a.albumname}</option>;
        });
    };

    return (
        <div>
            <h3>
                <Link to="/">{"<"} Back</Link>
            </h3>
            <h1>Select Album</h1>
            Select: &nbsp;
            <select
                disabled={add}
                value={selectedAlbum ? selectedAlbum.albumname : null}
                onChange={(e) => {
                    for (let i = 0; i < albumList.length; i++) {
                        if (albumList[i].albumname === e.target.value) {
                            setSelectedAlbum(albumList[i]);
                            break;
                        }
                    }
                }}
            >
                {getAlbumList()}
            </select>
            <button onClick={() => setAdd(!add)}>
                {add ? "Close" : "Add"}
            </button>
            {add ? (
                <AddAlbum apiUrl={apiUrl} setAlbumID={setSelectedAlbum} />
            ) : null}
            {selectedAlbum && !add && (
                <AddSong
                    apiUrl={apiUrl}
                    album={selectedAlbum.albumname}
                    albumID={selectedAlbum.id}
                />
            )}
        </div>
    );
};

const AddAlbum = ({ apiUrl, setAlbumID }) => {
    const [album, setAlbum] = useState("");
    const [artist, setArtist] = useState("");
    const [date, setDate] = useState("");
    const [icon, setIcon] = useState();
    const [preview, setPreview] = useState();
    const authToken = useSelector((state) => state.authReducer.token);

    useEffect(() => {
        if (!icon) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(icon);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [icon]);

    const postAlbum = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("icon", icon);
        data.append("album", album);
        data.append("artist", artist);
        data.append("releaseDate", date);
        await axios
            .post(`${apiUrl}/album`, data, {
                headers: { Authorization: authToken },
            })
            .then((res) => {
                console.log(res.data);
            });
        setAlbumID(album);
    };

    return (
        <div>
            <h1>Add Album</h1>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>Album Name:</td>
                            <td>
                                <input
                                    required={true}
                                    value={album}
                                    type="text"
                                    onChange={(e) => setAlbum(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Artist:</td>
                            <td>
                                <input
                                    required={true}
                                    value={artist}
                                    type="text"
                                    onChange={(e) => setArtist(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Release Date:</td>
                            <td>
                                <input
                                    required={true}
                                    value={date}
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Icon File:</td>
                            <td>
                                <input
                                    required={true}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (
                                            !e.target.files ||
                                            e.target.files.length === 0
                                        ) {
                                            setIcon(undefined);
                                            return;
                                        }
                                        setIcon(e.target.files[0]);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {icon && <img src={preview} alt="preview" />}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button onClick={(e) => postAlbum(e)}>
                                    Submit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};
