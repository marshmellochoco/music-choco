import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { rootReducer } from "../../store/rootReducer";
import { SearchContainer } from "../../common/Search/SearchContainer";

configure({ adapter: new Adapter() });
const store = createStore(rootReducer);

describe("Search", () => {
    it("should render the search", () => {
        const wrapper = mount(
            <Provider store={store}>
                <SearchContainer />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
