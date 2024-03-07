import {TasksStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolist, removeTodolist} from "./todolists-reducer";


type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)};
        case "ADD-TASK":
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.title
                } : t)
            };
        case "ADD-TODOLIST":
            return {[action.id]: [], ...state, ...state};
        case "REMOVE-TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        default :
           return state
    }
};

export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        todolistId
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        id,
        todolistId,
        isDone
    } as const
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        id,
        todolistId,
        title
    } as const
}

