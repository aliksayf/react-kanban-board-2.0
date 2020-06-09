import React, {useState} from 'react';
import './App.css'
import Board from "./components/Board";
import Modals from "./components/Modals";
import {status, tasks} from "./data/tasks";
import _ from "lodash";

function arrangeTasks(statusArr, taskArr) {
    const newArr = _.cloneDeep(statusArr)
    taskArr.map(el => newArr[el.status - 1].items.push(el))

    return newArr
}

function App() {
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState({});
    const [modalType, setModalType] = useState('');
    const [taskList, setTaskList] = useState(arrangeTasks(status, tasks))


    const handleShowModal = (object, type) => {
        setShow(true)
        setModalItem(object)
        setModalType(type)
    };

    const changeTask = (id, obj) => {
        const newTasks = taskList.map(el => el.items).flat()
        newTasks.map((el, idx) => newTasks[idx] = el.id === id ? Object.assign(obj) : el)
        setTaskList(arrangeTasks(status, newTasks))
    };

    const createNewTask = (obj) => {
        const newTasks = taskList.map(el => el.items).flat()
        newTasks.push(obj)
        setTaskList(arrangeTasks(status, newTasks))
    }

    return (
        <div className='container'>

            <button className='btn btn-sm btn-outline-dark ml-5' onClick={() => handleShowModal({}, 'create')}>Create
            </button>

            <Board setShow={handleShowModal}
                   taskArray={taskList}
            />
            <Modals show={show}
                    setShow={handleShowModal}
                    item={modalItem}
                    type={modalType}
                    createNewTask={createNewTask}
                    changeTask={changeTask}
            />

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default App;
