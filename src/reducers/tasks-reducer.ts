import {TasksStateType,} from "../App";
import {addTodolistAC, removeTodolistAC, setTodo} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolistApi/todolistApi";
import {Dispatch} from "redux";
import {RootStateType, ThunType, ThunkType} from "../state/store";


type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof setTodo>

let initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        // case "REMOVE-TASK":
        //     return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)};
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ?
                    {...t, status: action.status}
                 : t)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t,
                    title:action.title
                } : t)
            };
        case "ADD-TODOLIST":
            return {[action.todo.id]: [], ...state};
        case "REMOVE-TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(el => stateCopy[el.id] = [])
            return stateCopy
        }
        default :
            return state
    }
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todolistId
    } as const
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task
    } as const
}
export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) => {
    return {
        type: "CHANGE-TASK-STATUS",
        id,
        todolistId,
        status
    } as const
}
export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        id,
        todolistId,
        title
    } as const
}

export const setTasks = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        tasks,
        todolistId
    } as const
}

export const getTaskTC = (todolistId: string):ThunkType => (dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => dispatch(setTasks(todolistId, res.data.items)))
}
export const removeTaskTC = (todolistId: string, taskId: string):ThunkType => (dispatch) => {
    todolistApi.removeTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(todolistId, taskId)))
}
export const createTaskTC = (todolistId: string, title: string):ThunkType => (dispatch) => {
    todolistApi.createTask(todolistId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item)))
}

export const updateTaskTC = (todolisId: string, taskId: string, status:TaskStatuses):ThunkType => (dispatch, getState: ()=> RootStateType) => {
    const task = getState().tasks[todolisId].find(el => el.id === taskId)
    if (task) {
        const module: UpdateTaskModelType = {
            title: task.title,
            status: status,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description
        }

        todolistApi.updateTask(todolisId, taskId, module)
            .then(res=>dispatch(changeTaskStatusAC(todolisId, taskId, status)))
    }

}