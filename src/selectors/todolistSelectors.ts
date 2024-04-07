import {RootStateType} from "../state/store";

export const tasksSelector = (state:RootStateType)=>state.tasks
export const todolistsSelector = (state:RootStateType)=>state.todolists