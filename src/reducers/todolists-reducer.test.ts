import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolistsReducer} from "./todolists-reducer";

let todolistId1:string;
let todolistId2 :string;

let startState:Array<TodolistType>

beforeEach(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id:todolistId1, title: "What to learn", filter:"All"},
        {id:todolistId2, title: "What to buy", filter:"All"}
    ]
})

test('correct todolist should be removed', ()=>{


    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", ()=>{

    let newTodolistTitle = "New Todolist"


    const endState = todolistsReducer(startState, {type: "ADD-TODOLIST", title: newTodolistTitle, id: v1()} )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)


})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }as const

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'Completed'


    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    } as const

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})


