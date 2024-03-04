import React from "react";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>


export const todolistsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            let newTodo:TodolistType = {id:action.id, title:action.title, filter:"All"}
            return [newTodo, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t=>t.id===action.id? {...t, title: action.title}: t)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t=>t.id===action.id? {...t, filter: action.filter}: t)
        default :
            throw new Error("i don`t understand this type")
    }
};

export const removeTodolist = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        id
    } as const
}

export const addTodolist = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        id:v1()
    } as const
}

export const changeTodolistTitle = (id:string,title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title,
    } as const
}

export const changeTodolistFilter = (id:string,filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    } as const
}