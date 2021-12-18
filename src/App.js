import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import LoginLayout from "./layout/LoginLayout";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AppLayout from "./layout/AppLayout";
import { useSelector } from "react-redux";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(null);
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
