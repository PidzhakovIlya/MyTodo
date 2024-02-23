import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask:(id:number)=>void
    data?: string
    onChangeFilter: (filter:FilterValuesType)=>void
}

export const Todolist = ({title, tasks,removeTask, data,onChangeFilter}: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            {tasks.length !== 0 ?
                <ul>
                    {tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title={"X"} callBack={()=>removeTask(t.id)}/>
                    </li>)}
                </ul>
                : <p>"Тасок нет"</p>
            }
            <div>
                <Button title={"All"} callBack={()=>onChangeFilter("All")}/>
                <Button title={"Active"} callBack={()=>onChangeFilter("Active")}/>
                <Button title={"Completed"} callBack={()=>onChangeFilter("Completed")}/>
            </div>
            <div>{data}</div>
        </div>
    );
};
