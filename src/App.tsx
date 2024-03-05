import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBarHeader} from "./components/AppBarHeader/AppBarHeader";
import {Container, Grid, Paper} from "@mui/material";

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

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolist] = useState<TodolistType[]>(
        [{id: todolistId1, title: "What to Learn", filter: "All"},
            {id: todolistId2, title: "What to Learn", filter: "All"}]
    )

    const [tasks, setTasks] = useState<TaskStateType>({
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

    // const [tasks, setTasks] = useState<TaskType[]>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false}
    // ])

    // const [filter, setFilter] = useState<FilterValuesType>("All")

    const onChangeFilter = (id: string, filter: FilterValuesType) => {
        setTodolist(todolists.map(t => t.id === id ? {...t, filter} : t))
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, checked: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: checked} : t)})
    }
    const removeTodolist = (id: string) => {
        setTodolist(todolists.filter(t => t.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const newId = v1()
        const newTodo: TodolistType = {id: newId, title, filter: "All"}
        setTodolist([newTodo, ...todolists])
        setTasks({[newId]: [], ...tasks})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        return setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolist(todolists.map(el => el.id === todolistId ? {...el, title} : el))
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

export default App;
