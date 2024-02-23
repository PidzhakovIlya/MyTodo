import React from "react";

type ButtonPropsType = {
    title: string
    callBack:()=>void
}

export const Button = ({title,callBack}:ButtonPropsType) => {
    return (
        <button onClick={callBack}>
            {title}
        </button>
    );
};

