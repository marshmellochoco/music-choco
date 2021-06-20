// // ---------- Testing Libraries ----------
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import { configure, mount } from "enzyme";
// import toJson from "enzyme-to-json";

// // ---------- Dependancies and Components ----------
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { Player } from "../Components/AudioPlayer/Player";
// import { rootReducer } from "../Reducers/rootReducer";

// configure({ adapter: new Adapter() });
// const store = createStore(rootReducer);
// const testSongData = {
//     songId: "60b67f66f747a945dcc5d27c",
//     title: "To the Moon - Main Theme",
//     duration: 296,
//     albumname: "To the Moon (Original Soundtrack)",
//     albumId: "60b67f1ff747a945dcc5d27b",
//     artist: "Kan Gao",
// };
// store.dispatch({ type: "SET_SONG_DATA", songData: testSongData });

// describe("Player test", () => {
//     const tree = mount(
//         <Provider store={store}>
//             <Player />
//         </Provider>
//     );

//     it("should render the player correctly", () => {
//         expect(toJson(tree)).toMatchSnapshot();
//     });
// });
