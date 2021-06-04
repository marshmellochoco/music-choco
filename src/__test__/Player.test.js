import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { Player } from "../Components/AudioPlayer/Player";
import { rootReducer } from "../Reducers/rootReducer";

const store = createStore(rootReducer);

describe("Player test", () => {
    it("should render the player correctly", () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Player />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should set the player src and song detail", () => {
        const testSongData = {
            songId: "60b67f66f747a945dcc5d27c",
            title: "To the Moon - Main Theme",
            duration: 296,
            albumname: "To the Moon (Original Soundtrack)",
            albumId: "60b67f1ff747a945dcc5d27b",
            artist: "Kan Gao",
        };

        store.dispatch({ type: "SET_SONG_DATA", songData: testSongData });
        const tree = renderer.create(
            <Provider store={store}>
                <Player apiUrl={process.env.REACT_APP_API_URL}/>
            </Provider>
        );
        
        expect(tree).toMatchSnapshot();
    });
});
