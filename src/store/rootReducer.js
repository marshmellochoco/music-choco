import { queueReducer } from "./reducers/queueReducer";
import { songDataReducer } from "./reducers/songDataReducer";
import { playerReducer } from "./reducers/playerReducer";
import { authReducer } from "./reducers/authReducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    queueReducer,
    songDataReducer,
    playerReducer,
    authReducer,
});
