import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "../App";
import renderer from "react-test-renderer";
import { rootReducer } from "../Reducers/rootReducer";

const store = createStore(rootReducer);
store.dispatch({ type: "SET_TOKEN", token: "someToken" });

describe("Login", () => {
    it("should log in and redirect to homepage", () => {
        const tree = renderer.create(
            <Provider store={store}>
                {<App/>}
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
