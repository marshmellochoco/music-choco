import { queueReducer } from "../Reducers/queueReducer";
import { songDataReducer } from "../Reducers/songDataReducer";
import { playerReducer } from "../Reducers/playerReducer";
import { authReducer } from "../Reducers/authReducer";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    queueReducer,
    songDataReducer,
    playerReducer,
    authReducer,
});
