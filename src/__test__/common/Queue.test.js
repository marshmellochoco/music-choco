import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { rootReducer } from "../../store/rootReducer";
import { QueueContainer } from "../../common/Queue/QueueContainer";

configure({ adapter: new Adapter() });
const store = createStore(rootReducer);

describe("Queue", () => {
    it("should render the queue", () => {
        const wrapper = mount(
            <Provider store={store}>
                <QueueContainer />
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
