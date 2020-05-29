import React from 'react'
import {colors, priorityColors, statuses} from "../data/tasks";
import {FaCircle, FaExclamationTriangle} from "react-icons/fa";

function TaskDetailsView(props) {

    const {item} = props

    return (
        <>
            <div className='container p-4 '>
                <h5>{item.name}</h5>
                <table className="table table-borderless">
                    <tbody>
                    <thead>
                    </thead>
                    <tr className='row'>
                        <td className="col-2">Status:</td>
                        <td className="col-6">
                            <span>
                                <FaCircle className={'text-' + colors[item.status - 1]}/>
                            </span>
                            {'  '}{statuses[item.status - 1]}
                        </td>
                    </tr>
                    <tr className='row'>
                        <td className="col-2">Priority:</td>
                        <td className="col-6">
                            <span>
                                <FaExclamationTriangle className={priorityColors[item.priority]}/>
                            </span>
                            {'  '}{item.priority}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <label>Description:</label>
                <p>{item.description}</p>
                <div>
                    <button onClick={() => props.setShow(props.item, 'edit')}>Edit</button>
                    <button onClick={props.setShow}>Close</button>
                </div>
            </div>
        </>
    )
}

export default TaskDetailsView;
