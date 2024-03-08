import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>


let initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            let newTodo: TodolistType = {id: action.id, title: action.title, filter: "All"};
            return [newTodo, ...state];
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