import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";


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
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            {/*<input className={error ? "error" : undefined}*/}
            {/*       value={newTitle}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}/>*/}
            <TextField
                error={!!error}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                variant={"outlined"}
                label={"Title"}
                helperText={error}
            />

            {/*<Button variant="contained"*/}
            {/*        color="primary"*/}
            {/*        style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}}*/}
            {/*        onClick={addItem}*/}
            {/*>+</Button>*/}
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

