import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi, TodolistType} from "../api/todolistApi/todolistApi";
import {RootStateType, ThunkType} from "../state/store";


type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodo>


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(todo => ({...todo, filter: "All"}));
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            return [{...action.todo, filter:'All'}, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
        default :
            return state;
    }
};

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        id
    } as const
};

export const addTodolistAC = (todo: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        todo
    } as const
};

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title,
    } as const
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    } as const
};
export const setTodo = (todolists: TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
};


export const getTodo = ():ThunkType => (dispatch) => {
    todolistApi.getTodolists()
        .then(res =>
            dispatch(setTodo(res.data)))
}

export const addTodolistTC = (title: string):ThunkType => (dispatch) => {
    todolistApi.createTodolist(title).then(res =>
        dispatch(addTodolistAC(res.data.data.item))
    )
}
export const deleteTodolistTC = (id: string):ThunkType => (dispatch) => {
    todolistApi.deleteTodolist(id).then(res =>
        dispatch(removeTodolistAC(id))
    )
}

export const updateTodolistsTC = (id:string, title:string):ThunkType => (dispatch)=>{
 todolistApi.updateTodolist(id, title)
     .then(res=> dispatch(changeTodolistTitleAC(id, title)))
}