import React, {useCallback} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBarHeader} from "./components/AppBarHeader/AppBarHeader";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";

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
    console.log("app is called")
    let todolists = useSelector<RootStateType, Array<TodolistType>>((state) => state.todolists)
    let tasks = useSelector<RootStateType, TasksStateType>((state) => state.tasks)
    const dispatch = useDispatch()

    const onChangeFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch]);
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch]);
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, []);
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch]);
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch]);
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        return dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch]);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch]);

    return (
        <div className="App">
            <AppBarHeader/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return <Grid item key={todolist.id}>
                            <Paper style={{padding: " 10px"}}>
                                <Todolist
                                    key={todolist.id}
                                    title={todolist.title}
                                    id={todolist.id}
                                    tasks={tasks[todolist.id]}
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
