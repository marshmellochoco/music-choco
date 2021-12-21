import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const LibraryPage = () => {
    const error = false;

    return !error ? (
        <div className="content page-content">
            <h1 className="title">Library</h1>
            <Link to="/playlist/61ba3c7e8aca3ac9287c569b">My Playlist</Link>
        </div>
    ) : (
        <ErrorPage />
    );
};

export default LibraryPage;

// TODO: Implement list library
