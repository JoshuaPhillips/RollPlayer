import { combineReducers } from "redux";
import { characterBuildReducer } from "./characterBuilderReducer";

export const rootReducer = combineReducers({ characterBuilder: characterBuildReducer });
