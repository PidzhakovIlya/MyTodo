import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi, TodolistType} from "../api/todolistApi/todolistApi";


type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodo>


type TodolistDomainType = TodolistType & {
    filter:FilterValuesType
}

let initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            // let newTodo: TodolistType = {id: action.id, title: action.title, filter: "All"};
            return [...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
        case "SET-TODOLISTS":
           return action.todolists
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

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        id: v1()
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
export const setTodo = (todolists: TodolistType) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
};


export const getTodo = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => dispatch(setTodo(res.data)))
}