import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { moviesReducer } from "./reducers/moviesReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const reducers = combineReducers({
  movieAPI: moviesReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistedStore = persistStore(store);
