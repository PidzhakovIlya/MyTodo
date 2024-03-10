import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";


type AddItemFormType = {
    addItem: (newTitle: string) => void
}


export const AddItemForm = React.memo((props: AddItemFormType) => {

    console.log("AddItemForm is called")

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

    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null) {
            setError(null)
        }
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                error={!!error}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                variant={"outlined"}
                label={"Title"}
                helperText={error}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

