import { combineReducers } from "redux";
import queueReducer from "./queue/queueReducer";
import playerReducer from "./player/playerReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    playerReducer,
    queueReducer,
    userReducer,
});

export default rootReducer;
