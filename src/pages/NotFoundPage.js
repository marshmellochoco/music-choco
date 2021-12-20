import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFoundPage = () => {
    return (
        <div className="content page-content">
            <h1 className="title">404</h1>
            <h2>The page was not found</h2>
            <Link className="btn btn-confirm w-max" to="/">
                Go back
            </Link>
        </div>
    );
};

export default NotFoundPage;
