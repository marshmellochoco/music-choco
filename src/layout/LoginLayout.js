import logo from "../images/music-choco.png";

const LoginLayout = ({ children }) => {
    return (
        <div>
            <div className="py-4 navbar-shadow">
                <img
                    src={logo}
                    alt={"music-choco"}
                    className="mx-auto max-w-lg h-12"
                />
            </div>
            <div className="mx-auto mt-12 max-w-lg">{children}</div>
        </div>
    );
};

export default LoginLayout;
