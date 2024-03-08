import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>