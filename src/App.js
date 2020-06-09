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
        const newList = _.cloneDeep(taskList);
        newList.map((el, idx) => el.items.map((task, index) => task.id === id ? newList[idx].items[index] = Object.assign(obj) : ''))
        const newTasks = []
        newList.map(el => el.items.map(task => newTasks.push(task)))
        const changedTaskList = _.cloneDeep(status)
        newTasks.map(el => changedTaskList[el.status - 1].items.push(el))
        setTaskList(changedTaskList)
    };

    const createNewTask = (obj) => {
        const newList = _.cloneDeep(tasks);
        newList.push(obj)
        const newArr = _.cloneDeep(status)
        newList.map(el => newArr[el.status - 1].items.push(el))
        setTaskList(newArr)
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
        </div>
    );
}

export default App;
