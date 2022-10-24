/* eslint-disable import/no-named-as-default */
import { fetchTypesThunk } from "app/reducers/userTypes/thunks";
import { fetchUsersThunk } from "app/reducers/user/thunk";
import { fetchDemandsThunk } from "app/reducers/demand/thunk";
import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import newsReducer from "app/reducers/news/newsSlice";
import cityReducer from "app/reducers/city/citySlice";
import axesReducer from "app/reducers/axes/axesSlice";
import { persistReducer } from "redux-persist";
import { persistConfig } from "util/Modification";
import toastReducer from "app/reducers/toast/toastSlice";
import { fetchDocumentsThunk } from "./document/thunk";
import documentReducer from "./document/documentSlice";
import usersReducer from "./user/userSlice";
import demandReducer from "./demand/demandSlice";
import userTypesReducer from "./userTypes/userTypes";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  news: persistReducer(persistConfig, newsReducer),
  users: usersReducer,
  demands: persistReducer(persistConfig, demandReducer),
  documents: persistReducer(persistConfig, documentReducer),
  userTypes: userTypesReducer,
  loadingBar: loadingBarReducer,
  city: cityReducer,
  axes: axesReducer,
  toast: toastReducer,
  auth: persistReducer(persistConfig, authReducer),
  // proposals: proposalSlice,
});
/*
  auth: persistReducer(persistConfig, newsReducer),
*/
export default rootReducer;

export {
  fetchDocumentsThunk,
  fetchDemandsThunk,
  fetchUsersThunk,
  fetchTypesThunk,
};
