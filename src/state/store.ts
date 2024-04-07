import {Action, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer,undefined, applyMiddleware(thunk))




export type RootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<RootStateType, unknown, Action>

export const useAppDispatch = ()=>useDispatch<AppDispatchType>()
export const useAppSelector :TypedUseSelectorHook<RootStateType> = useSelector

