import React from "react";
import { priorityColors, colors } from "../data/tasks";
import { FaExclamationTriangle } from 'react-icons/fa'

export default function TaskCard (props) {

     return (
        <>
            <p>
                {props.item.name}
            </p>
            <p>
                <FaExclamationTriangle  className={priorityColors[props.item.priority]}/>
            </p>
        </>
    )
}