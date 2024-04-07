import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBarHeader} from "./components/AppBarHeader/AppBarHeader";
import {Container, Grid, Paper} from "@mui/material";
import {changeTaskTitleAC, createTaskTC, removeTaskTC, updateTaskTC} from "./reducers/tasks-reducer";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    deleteTodolistTC,
    getTodo,
    TodolistDomainType,
    updateTodolistsTC
} from "./reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolistApi/todolistApi";

export type TasksStateType = {
    [key: string]: TaskType[]
}


export type FilterValuesType = "All" | "Active" | "Completed"

function App() {
    console.log("app is called")

    let todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists)

    let tasks = useAppSelector<TasksStateType>((state) => state.tasks)
    const dispatch = useAppDispatch()

    const onChangeFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch]);
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch]);
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, []);
    const changeTaskStatus = useCallback((todolistId: string,  status: TaskStatuses, taskId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, status))
    }, [dispatch]);
    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistTC(id))
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch]);
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        return dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch]);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistsTC(todolistId, title))
    }, [dispatch]);
    useEffect(() => {
        dispatch(getTodo())
    }, []);

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

export default App;
