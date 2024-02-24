import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("All")

    const onChangeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string)=>{
        const newTask =  {id: v1(), title, isDone: true}
        setTasks([newTask ,...tasks])
    }

    const filteredTask = () => {
        if (filter === "Completed") return tasks.filter(t => t.isDone === true)
        if (filter === "Active") return tasks.filter(t => t.isDone === false)
        return tasks
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeTaskStatus = (taskId:string, checked:boolean) => {
        setTasks(tasks.map(t=>t.id===taskId? {...t, isDone:checked}:t))
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={filteredTask()}
                      removeTask={removeTask}
                      addTask={addTask}
                      filter={filter}
                      data={"23.02.2024"}
                      onChangeFilter={onChangeFilter}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
