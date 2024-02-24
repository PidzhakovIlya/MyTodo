import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    data?: string
    onChangeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, checked: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             data,
                             onChangeFilter,
                             addTask,
                             changeTaskStatus,
                             filter
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
            addTask(titleValue.trim())
            setTitleValue("")
        } else {
            setError("Title is Required")
        }
    }
    const changeTaskStatusHandler = (id: string, checked: boolean) => {
        changeTaskStatus(id, checked)
    }

    return (
        <div>
            <h3>{title}</h3>
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
                            <span className={t.isDone ? 'is-done': ''}>{t.title}</span>
                            <Button title={"X"} callBack={() => removeTask(t.id)}/>
                        </li>)}
                </ul>
                : <p>"Тасок нет"</p>
            }
            <div>
                <Button className={filter === "All" ? "active-filter" : ""}
                        title={"All"}
                        callBack={() => onChangeFilter("All")}/>
                <Button className={filter === "Active" ? "active-filter" : ""}
                        title={"Active"}
                        callBack={() => onChangeFilter("Active")}/>
                <Button className={filter === "Completed" ? "active-filter" : ""}
                        title={"Completed"}
                        callBack={() => onChangeFilter("Completed")}/>
            </div>
            <div>{data}</div>
        </div>
    );
};
