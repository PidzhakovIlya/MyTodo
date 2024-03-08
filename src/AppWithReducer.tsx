import React, {useReducer, useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBarHeader} from "./components/AppBarHeader/AppBarHeader";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type FilterValuesType = "All" | "Active" | "Completed"

function AppWithReducer() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, dispatchToTodolist] =useReducer(todolistsReducer,
        [{id: todolistId1, title: "What to Learn", filter: "All"},
            {id: todolistId2, title: "What to Learn", filter: "All"}]
    )

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cola", isDone: false},
            {id: v1(), title: "Apple", isDone: false}
        ]
    })

    const onChangeFilter = (id: string, filter: FilterValuesType) => {
        dispatchToTodolist(changeTodolistFilterAC(id, filter))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }


    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(todolistId,taskId))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const removeTodolist = (id: string) => {
        dispatchToTodolist(removeTodolistAC(id))
        dispatchToTasks(removeTodolistAC(id))
    }
    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        return dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolist(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <AppBarHeader/>
            <Container fixed>
                <Grid container  style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        const filteredTask = (): TaskType[] => {
                            if (todolist.filter === "Completed") return tasks[todolist.id].filter(t => t.isDone === true)
                            if (todolist.filter === "Active") return tasks[todolist.id].filter(t => t.isDone === false)
                            return tasks[todolist.id]
                        }
                        return <Grid item>
                            <Paper style={{padding: " 10px"}}>
                                <Todolist
                                    key={todolist.id}
                                    title={todolist.title}
                                    id={todolist.id}
                                    tasks={filteredTask()}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    filter={todolist.filter}
                                    data={"23.02.2024"}
                                    onChangeFilter={onChangeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}/>
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
