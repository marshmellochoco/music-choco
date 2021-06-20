// import { configure, mount } from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import toJson from "enzyme-to-json";
// import { Route, BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";

// import { rootReducer } from "../Reducers/rootReducer";

// configure({ adapter: new Adapter() });
// const store = createStore(rootReducer);

// describe("components test", () => {
//     it("should render card correctly", () => {
//         const location = { pathname: "/music-choco" };
//         const wrapper = mount(
//             <Provider store={store}>
//                 <Router>
//                     <Route location={location}>
//                         <Card id={"60883d8e1a02ff3eac90191f"} />
//                     </Route>
//                 </Router>
//             </Provider>
//         );
//         expect(toJson(wrapper)).toMatchSnapshot();
//     });

//     it("should render searchbar correctly", () => {
//         const wrapper = mount(<Searchbar />);
//         expect(toJson(wrapper)).toMatchSnapshot();
//     });

//     it("should be able to search", () => {
//         const mockSearch = jest.fn();
//         const wrapper = mount(<Searchbar handleSearch={mockSearch} />);
//         wrapper
//             .find("input")
//             .simulate("change", { target: { value: "search" } });
//         expect(mockSearch.mock.calls.length).toBe(1);
//         expect(mockSearch).toBeCalledWith("search");
//     });

//     it("should render slider correctly", () => {
//         const wrapper = mount(<Slider transform={50} />);
//         expect(toJson(wrapper)).toMatchSnapshot();
//     });

//     it("should be able to slide", () => {
//         const mockChange = jest.fn();
//         const wrapper = mount(<Slider onChange={mockChange} transform={50} />);
//         wrapper.find("input").simulate("change", { target: { value: 20 } });
//         expect(mockChange.mock.calls.length).toBe(1);
//     });
// });
