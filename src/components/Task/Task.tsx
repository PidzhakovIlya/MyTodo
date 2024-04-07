import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../api/todolistApi/todolistApi";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, status: TaskStatuses, taskId: string) => void
    changeTaskTitle: (todoId: string, TaskId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);

    const onTitleChangeHandler = useCallback((newTitle: string) => changeTaskTitle(todolistId, task.id, newTitle), [changeTaskTitle, todolistId, task])

    return (
        <li key={task.id} className={task.status---TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
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