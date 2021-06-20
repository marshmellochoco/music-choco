import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { rootReducer } from "../../store/rootReducer";
import { AudioPlayerContainer } from "../../common/AudioPlayer/AudioPlayerContainer";

configure({ adapter: new Adapter() });
const store = createStore(rootReducer);

describe("AudioPlayer", () => {
    it("should render the player", () => {
        const wrapper = mount(
            <Provider store={store}>
                <AudioPlayerContainer />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
