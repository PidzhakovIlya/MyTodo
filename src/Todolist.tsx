import React from "react";
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    data?: string
}

export const Todolist = ({title, tasks, data}: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            {tasks.length !== 0 ?
                <ul>
                    {tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    </li>)}
                </ul>
                : <p>"Тасок нет"</p>
            }
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
            <div>{data}</div>
        </div>
    );
};
