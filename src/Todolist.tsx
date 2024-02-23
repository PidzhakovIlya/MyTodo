import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask:(id:string)=>void
    data?: string
    onChangeFilter: (filter:FilterValuesType)=>void
    addTask:(title:string)=>void
}

export const Todolist = ({title, tasks,removeTask, data,onChangeFilter, addTask}: TodolistPropsType) => {
    const [titleValue, setTitleValue] = useState<string>('')

    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitleValue(e.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter"){
        addTaskHandler()
    }
    }

    const addTaskHandler = () =>{
        addTask(titleValue)
        setTitleValue('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleValue} onChange={changeTaskTitleHandler}  onKeyDown={addTaskOnKeyUpHandler} />
               <Button title={"+"} callBack={addTaskHandler}/>
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
