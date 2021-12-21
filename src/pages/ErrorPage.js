import { Link } from "react-router-dom";

const ErrorPage = () => {
    // TODO: Failed to load
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-4xl font-bold my-2">Oops!</h2>
            <p>Something went wrong while loding the page.</p>
            <Link to="/" className="btn btn-confirm">
                Back to homepage
            </Link>
        </div>
    );
};

export default ErrorPage;
