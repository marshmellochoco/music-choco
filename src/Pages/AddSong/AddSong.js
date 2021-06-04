// dependancy import
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const AddSong = ({ apiUrl, album, albumID }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const authToken = useSelector((state) => state.authReducer.token);

    const addSong = (e) => {
        e.preventDefault();
        if (!name || !file) return;
        const data = new FormData();
        data.append("file", file);
        data.append("albumID", albumID);
        data.append("songName", name);
        axios
            .post(`${apiUrl}/song`, data, {
                headers: { Authorization: authToken },
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div>
            <div>
                <h1>Add Song</h1>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>Album: </td>
                                <td>{album}</td>
                            </tr>
                            <tr>
                                <td>Name:</td>
                                <td>
                                    <input
                                        value={name}
                                        type="text"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Audio File:</td>
                                <td>
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                            setName(e.target.files[0].name);
                                        }}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2">
                                    <button onClick={(e) => addSong(e)}>
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};
