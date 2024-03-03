import React from "react";
import {FilterValuesType, TaskType} from "./App";
// import {Button} from "./Button";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, id: string) => void
    id: string
    data?: string
    onChangeFilter: (id: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, checked: boolean) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTaskTitle: (todoId: string, TaskId: string, title: string) => void
    changeTodolistTitle: (todoId: string, title: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             tasks,
                             removeTask,
                             data,
                             onChangeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistPropsType) => {

    // const [titleValue, setTitleValue] = useState<string>("")
    // const [error, setError] = useState<string | null>(null)
    //
    // const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitleValue(e.currentTarget.value)
    // }
    // const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (e.key == "Enter") {
    //         addTaskHandler()
    //     }
    // }

    // const addTaskHandler = () => {
    //     if (titleValue.trim() !== "") {
    //         addTask(id, titleValue.trim())
    //         setTitleValue("")
    //     } else {
    //         setError("Title is Required")
    //     }
    // }
    const addTaskHandler = (title: string) => {
        addTask(id, title)
    }

    const changeTaskStatusHandler = (taskId: string, checked: boolean) => {
        changeTaskStatus(id, taskId, checked)
    }
    return (
        <div>
            <h3>
                <EditableSpan text={title} onChange={(newTitle) => changeTodolistTitle(id, newTitle)}/>
                {/*<Button  callBack={() => removeTodolist(id)} title={"X"}/>*/}
                <IconButton onClick={() => removeTodolist(id)}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {tasks.length !== 0 ?
                <ul>
                    {tasks.map(t =>
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>

                            {/*<input type="checkbox"*/}
                            {/*       checked={t.isDone}*/}
                            {/*       onChange={(e) => changeTaskStatusHandler(t.id, e.currentTarget.checked)}/>*/}
                            <Checkbox  checked={t.isDone}
                                       onChange={(e) => changeTaskStatusHandler(t.id, e.currentTarget.checked)}
                                       color={'primary'}
                            />
                            <EditableSpan text={t.title} onChange={(newTitle) => changeTaskTitle(id, t.id, newTitle)}/>
                            {/*<span className={t.isDone ? "is-done" : ""}>{t.title}</span>*/}
                            {/*<Button title={"X"} callBack={() => removeTask(id, t.id)}/>*/}
                            <IconButton onClick={() => removeTask(id, t.id)}>
                                <Delete/>
                            </IconButton>
                        </li>)}
                </ul>
                : <p>"Тасок нет"</p>
            }
            <div>
                <Button variant={filter === "All" ? "outlined" : "contained"}
                        color="primary"
                        onClick={() => onChangeFilter(id, "All")}
                >All
                </Button>
                <Button
                    onClick={() => onChangeFilter(id, "Active")}
                    variant={filter === "Active" ? "outlined" : "contained"}
                >Active
                </Button>
                <Button
                    // className={filter === "Completed" ? "active-filter" : ""}
                    variant={filter === "Completed" ? "outlined" : "contained"}
                    onClick={() => onChangeFilter(id, "Completed")}
                >Completed
                </Button>
            </div>
            <div>{data}</div>
        </div>
    );
};
