import React from "react";

export default function TaskCard (props) {
        console.log(props.item)
    return (
        <>
            {props.item.name}
            <p>{props.item.priority}</p>
        </>
    )
}