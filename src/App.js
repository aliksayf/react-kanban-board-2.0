import React, {useState} from 'react';
import './App.css'
import Board from "./components/Board";
import Modals from "./components/Modals";
import {status, tasks} from "./data/tasks";
import _ from "lodash";

const newArr = [...status]
tasks.map(el => newArr[el.status - 1].items.push(el))

function App() {
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState({});
    const [modalType, setModalType] = useState('');
    const [taskList, setTaskList] = useState(newArr)

    const handleShowModal = (object, type) => {
        setShow(true)
        setModalItem(object)
        setModalType(type)
    };

    const changeTask = (id, obj) => {
        const newList = _.cloneDeep(taskList);
        newList.map((el, idx) => el.items.map((task, index) => task.id === id ? newList[idx].items[index] = Object.assign(obj) : ''))
        // console.log('change1', newList)
        // for (let [key, value] of Object.entries(newList)){
        //     value.items.map(el => el.id === id ? obj : el)
        // }          //.map(([key, el])=> el.items.map(el => el.id === id ? obj : el))
        console.log('change', newList)
        setTaskList(newList)
    };

    return (
        <div>

            <Board setShow={handleShowModal}
                   taskList={taskList}
                   setTaskList={setTaskList}
            />
            <Modals show={show}
                    setShow={handleShowModal}
                    item={modalItem}
                    type={modalType}
                    changeTask={changeTask}
            />
        </div>
    );
}

export default App;
