import React from 'react'
import parse from 'html-react-parser';
import {colors, priorityColors, statuses} from "../data/tasks";
import {FaCircle, FaExclamationTriangle} from "react-icons/fa";

function TaskDetailsView(props) {

    const {item} = props
    const parser = new DOMParser();
    // const doc = parser.parseFromString(item.description, "text/html")

    return (
        <>
            <div className='container p-4 '>
                <h5>{item.name}</h5>
                <table className="table table-borderless">
                    <thead>
                    </thead>
                    <tbody>
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
                <div className='border p-3'>{parse(item.description)}</div>
                <div>
                    <button className='btn btn-link float-right' onClick={props.setShow}>Close</button>
                    <button className='btn btn-light float-right'
                            onClick={() => props.setShow(props.item, 'edit')}>Edit
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskDetailsView;
