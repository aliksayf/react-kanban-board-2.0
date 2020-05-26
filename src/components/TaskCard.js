import React from "react";
import {priorityColors} from "../data/tasks";
import {FaExclamationTriangle} from 'react-icons/fa'

export default function TaskCard(props) {


    return (
        <div className='m-n2 p-2 pb-sm-0'>
            <p>
                {props.item.name}
            </p>
            <p>
                <FaExclamationTriangle className={priorityColors[props.item.priority]}/>
            </p>


        </div>
    )
}