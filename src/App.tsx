import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("All")

    const onChangeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    const filteredTask = () => {
        if (filter === "Completed") return tasks.filter(t => t.isDone === true)
        if (filter === "Active") return tasks.filter(t => t.isDone === false)
        return tasks
    }

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={filteredTask()}
                      removeTask={removeTask}
                      data={"23.02.2024"}
                      onChangeFilter={onChangeFilter}/>
        </div>
    );
}

export default App;
