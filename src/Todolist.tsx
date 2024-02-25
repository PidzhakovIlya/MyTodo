import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskStateType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId:string, id: string) => void
    id: string
    data?: string
    onChangeFilter: ( id: string, filter: FilterValuesType) => void
    addTask: (todolistId:string, title: string) => void
    changeTaskStatus: (todolistId:string, taskId: string, checked: boolean) => void
    filter: FilterValuesType
    removeTodolist:(id:string)=>void
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
                             removeTodolist
                         }: TodolistPropsType) => {

    const [titleValue, setTitleValue] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key == "Enter") {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (titleValue.trim() !== "") {
            addTask(id, titleValue.trim())
            setTitleValue("")
        } else {
            setError("Title is Required")
        }
    }
    const changeTaskStatusHandler = (taskId: string, checked: boolean) => {
        changeTaskStatus(id ,taskId, checked)
    }

    return (
        <div>
            <h3>
                {title}
                <Button callBack={()=>removeTodolist(id)} title={"X"}/>
            </h3>

            <div>
                <input className={error ? "error" : undefined} value={titleValue} onChange={changeTaskTitleHandler}
                       onKeyDown={addTaskOnKeyUpHandler}/>
                <Button title={"+"} callBack={addTaskHandler}/>
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            {tasks.length !== 0 ?
                <ul>
                    {tasks.map(t =>
                        <li key={t.id}><input type="checkbox"
                                              checked={t.isDone}
                                              onChange={(e) => changeTaskStatusHandler(t.id, e.currentTarget.checked)}/>
                            <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                            <Button title={"X"} callBack={() => removeTask(id,t.id)}/>
                        </li>)}
                </ul>
                : <p>"Тасок нет"</p>
            }
            <div>
                <Button className={filter === "All" ? "active-filter" : ""}
                        title={"All"}
                        callBack={() => onChangeFilter(id, "All")}/>
                <Button className={filter === "Active" ? "active-filter" : ""}
                        title={"Active"}
                        callBack={() => onChangeFilter(id,"Active")}/>
                <Button className={filter === "Completed" ? "active-filter" : ""}
                        title={"Completed"}
                        callBack={() => onChangeFilter(id,"Completed")}/>
            </div>
            <div>{data}</div>
        </div>
    );
};
