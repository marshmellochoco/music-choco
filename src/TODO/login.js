// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { configure, mount } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import toJson from "enzyme-to-json";

// import App from "../App";
// import { rootReducer } from "../Reducers/rootReducer";
// import { Login } from "../Pages/Login/Login";

// configure({ adapter: new Adapter() });
// const initStore = createStore(rootReducer);
// const store = createStore(rootReducer);
// store.dispatch({ type: "SET_TOKEN", token: "someToken" });

// describe("Login", () => {
//     it("should render the login page correctly", () => {
//         const tree = mount(<Provider store={initStore}>{<Login />}</Provider>);
//         expect(toJson(tree)).toMatchSnapshot();
//     });

//     it("should let user enter username and password", () => {
//         const tree = mount(<Provider store={initStore}>{<Login />}</Provider>);
//         tree.find("#username").simulate("change", {
//             target: { value: "username" },
//         });
//         tree.find("#password").simulate("change", {
//             target: { value: "password" },
//         });
//         expect(tree.find("#username").props().value).toEqual("username");
//         expect(tree.find("#password").props().value).toEqual("password");
//     });

//     it("should let user to login", () => {
//         const mockCallback = jest.fn();
//         const tree = mount(
//             <Provider store={initStore}>
//                 {<Login handleLogin={mockCallback} />}
//             </Provider>
//         );
//         tree.find("#username").simulate("change", {
//             target: { value: "username" },
//         });
//         tree.find("#password").simulate("change", {
//             target: { value: "password" },
//         });
//         tree.find("#login").simulate("click");
//         expect(mockCallback.mock.calls.length).toBe(1);
//     });

//     it("should handle user registration", () => {});
// });
