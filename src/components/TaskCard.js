import React, {useState} from "react";
import { priorityColors } from "../data/tasks";
import { FaExclamationTriangle } from 'react-icons/fa'
import TaskDetailsView from "./TaskDetailsView";

export default function TaskCard (props) {


    const toggleModal = () => {
        if( props.modal === 'modal'){
            props.setModal('show')
        }else props.setModal('modal')
    }

    return (
        <div className='m-n2 p-2 pb-sm-0' onClick={toggleModal}>
            <p>
                {props.item.name}
            </p>
            <p>
                <FaExclamationTriangle  className={priorityColors[props.item.priority]}/>
            </p>


        </div>
    )
}