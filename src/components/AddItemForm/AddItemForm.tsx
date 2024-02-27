import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormType = {
    addItem: (newTitle: string) => void
}


export const AddItemForm = (props: AddItemFormType) => {
    const [newTitle, setNewTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key ==='Enter'){
            addItem()
        }
            }

    return (
        <div>
            <input className={error ? "error" : undefined}
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};

