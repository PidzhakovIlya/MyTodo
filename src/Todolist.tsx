import React, {useCallback, useMemo} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {Task} from "./components/Task/Task";

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

export const Todolist = React.memo(({
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

            console.log("todolist is called")

            const addTaskHandler = useCallback((title: string) => {
                addTask(id, title)
            }, [addTask, id])

            const changeTodolistTitleHandler = useCallback((newTitle: string) => {
                changeTodolistTitle(id, newTitle)
            }, [changeTodolistTitle, id])

            const filteredTasks = tasks

            const filteredTask = useMemo((): TaskType[] => {
                if (filter === "Completed") return filteredTasks.filter(t => t.isDone)
                if (filter === "Active") return filteredTasks.filter(t => !t.isDone)
                return filteredTasks
            },[tasks, filter])



            return (
                <div>
                    <h3>
                        <EditableSpan text={title} onChange={(newTitle) => changeTodolistTitleHandler(newTitle)}/>
                        <IconButton onClick={() => removeTodolist(id)}>
                            <Delete/>
                        </IconButton>
                    </h3>
                    <AddItemForm addItem={addTaskHandler}/>
                    {tasks.length !== 0 ?
                        <ul>
                            {filteredTask.map(t => <Task key={t.id}
                                                  todolistId={id}
                                                  task={t}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeTaskTitle={changeTaskTitle}
                                                  removeTask={removeTask}
                            />)}
                        </ul>
                        : <p>"Тасок нет"</p>
                    }
                    <div>
                        <Button variant={filter === "All" ? "outlined" : "contained"}
                                color="primary"
                                onClick={useCallback(() => onChangeFilter(id, "All"), [onChangeFilter, id])}
                        >All
                        </Button>
                        <Button
                            onClick={useCallback(() => onChangeFilter(id, "Active"), [onChangeFilter, id])}
                            variant={filter === "Active" ? "outlined" : "contained"}
                        >Active
                        </Button>
                        <Button
                            variant={filter === "Completed" ? "outlined" : "contained"}
                            onClick={useCallback(() => onChangeFilter(id, "Completed"), [onChangeFilter, id])}
                        >Completed
                        </Button>
                    </div>
                    <div>{data}</div>
                </div>
            );
        }
    )
;


