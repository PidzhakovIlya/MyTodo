import {TaskType} from "../../App";
import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, taskId: string, checked: boolean) => void
    changeTaskTitle: (todoId: string, TaskId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked), [todolistId, task.id])
    const onTitleChangeHandler = useCallback((newTitle: string) => changeTaskTitle(todolistId, task.id, newTitle), [changeTaskTitle, todolistId, task])

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox checked={task.isDone}
                      onChange={onChangeHandler}
                      color={"primary"}
            />
            <EditableSpan text={task.title}
                          onChange={(newTitle) => onTitleChangeHandler(newTitle)}/>
            <IconButton onClick={() => removeTask(todolistId, task.id)}>
                <Delete/>
            </IconButton>
        </li>)
})