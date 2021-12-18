import { Link } from "react-router-dom";

const LibraryPage = () => {
    return (
        <div className="content page-content">
            <h1 className="title">Library</h1>
            <Link to="/playlist/61ba3c7e8aca3ac9287c569b">My Playlist</Link>
        </div>
    );
};

export default LibraryPage;
