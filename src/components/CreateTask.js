import React, {useRef, useState} from 'react'
import JoditEditor from "jodit-react";
import 'jodit';
import 'jodit/build/jodit.min.css';
import {priority, statuses} from "../data/tasks";


const newTask = {
    id: Date.now().toString(),
    name: '',
    description: '',
    status: 1,
    queue: 0,
    priority: 'Low'
}

function CreateTask(props) {

    const editor = useRef(null)

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    const [editedItem, setEditedItem] = useState(newTask)
    // const [disabledButton, setDisabledButton] = useState(true)

    const saveTask = () => {
        props.createNewTask(editedItem)
        props.setShow()
    }

    return (
        <>
            <div className='container p-4 '>
                <h5>Create new task</h5>
                <table className="table table-borderless">
                    <tbody>
                    <tr className='row'>
                        <td className="col-1">Name:&#42;</td>
                        <td className="col-6">
                            <input className="form-control-plaintext-sm pl-2"
                                   required
                                   value={editedItem.name}
                                   onChange={(e) => setEditedItem({...editedItem, name: e.target.value})}
                            />
                        </td>
                    </tr>
                    <tr className='row'>
                        <td className="col-1">Status:</td>
                        <td className="col-sm-4">
                            <select className="form-control-sm"
                                    id="selectStatus"
                                    value={statuses[editedItem.status - 1]}
                                    onChange={(e) => setEditedItem({
                                        ...editedItem,
                                        status: statuses.indexOf(e.target.value) + 1
                                    })}
                            >
                                {statuses.map((el, i) => (
                                    <option key={i}>{el}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr className='row'>
                        <td className="col-1">Priority:</td>
                        <td className="col-sm-4">
                            <select className="form-control-sm"
                                    id="selectPriority"
                                    value={editedItem.priority}
                                    onChange={(e) => setEditedItem({...editedItem, priority: e.target.value})}
                            >
                                {priority.map(el => (
                                    <option key={el} value={el === editedItem.priority}>{el}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr className='row'>
                        <td className="col-1">Description:</td>
                        <td className="col-3"></td>
                    </tr>
                    <tr className='row'>
                        <td className="col-1"></td>
                        <td className='col-10'>
                            <JoditEditor
                                ref={editor}
                                value={editedItem.description}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setEditedItem({
                                    ...editedItem,
                                    description: newContent.toString()
                                })} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {
                                }}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button className='btn btn-link float-right'
                        onClick={props.setShow}>Cancel
                </button>
                <button className='btn btn-light float-right ' disabled={editedItem.name === ''}
                        onClick={saveTask}>Save
                </button>
            </div>
        </>
    )
}

export default CreateTask;
