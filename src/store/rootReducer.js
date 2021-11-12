import { combineReducers } from "redux";
import queueReducer from "./queue/queueReducer";
import playerReducer from "./player/playerReducer";

const rootReducer = combineReducers({
    playerReducer,
    queueReducer,
});

export default rootReducer;
