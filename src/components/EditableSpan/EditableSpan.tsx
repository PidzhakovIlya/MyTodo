import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    text: string
    onChange:(newTitle:string)=>void
}

export const EditableSpan = ({text, onChange}:EditableSpanType) => {
    const [ isEdit, setIsEdit]=useState<boolean>(false)
    const [newText, setNewText] = useState<string>(text)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewText(e.currentTarget.value)
    }
    const activeEditMode = () =>{
        setIsEdit(true)
    }

    const activateViewMode = () =>{
        setIsEdit(false)
        onChange(newText)
    }

    return (
        <>
            {isEdit ?
                <input value={newText} onChange={onChangeHandler} onBlur={activateViewMode}/>
                :
                <span onClick={activeEditMode} >{text}</span>}
        </>
    );
};
