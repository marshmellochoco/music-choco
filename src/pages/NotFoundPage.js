import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFoundPage = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-4xl font-bold my-2">Oops!</h2>
            <p className="font-bold uppercase">404 - Page not Found</p>
            <p>
                The page you are looking for might have been removed <br />
                or is temporary unavailable.
            </p>
            <Link to="/" className="btn btn-primary">
                Back to homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
