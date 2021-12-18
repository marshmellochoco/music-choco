import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import LoginLayout from "./layout/LoginLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AppLayout from "./layout/AppLayout";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import PlaylistPage from "./pages/PlaylistPage";

const App = () => {
    const setLoggedIn = () => {};
    const { token } = useSelector((state) => state.userReducer);

    return (
        <Router>
            {!token ? (
                <LoginLayout>
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/signUp">
                            <SignUpPage />
                        </Route>
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                </LoginLayout>
            ) : (
                <AppLayout setLoggedIn={setLoggedIn}>
                    <Switch>
                        <Route path="/artist/:id" component={ArtistPage} />
                        <Route path="/album/:id" component={AlbumPage} />
                        <Route path="/playlist/:id" component={PlaylistPage} />
                        <Route path="/library" component={LibraryPage} />
                        <Route exact path="/" component={HomePage} />
                        <Route path="/">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </AppLayout>
            )}
        </Router>
    );
};

export default App;
