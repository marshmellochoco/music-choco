import { queueReducer } from "./queueReducer";
import { songDataReducer } from "./songDataReducer";
import { playerReducer } from "./playerReducer";
import { authReducer } from "./authReducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    queueReducer,
    songDataReducer,
    playerReducer,
    authReducer,
});
