import React, {useState} from 'react';
import './App.css'
import Board from "./components/Board";
import Modals from "./components/Modals";

function App() {
    const [show, setShow] = useState(false);
    const [modalItem, setModalItem] = useState({});
    const [modalType, setModalType] = useState('');

    const handleShowModal = (object, type) => {
        setShow(!show)
        setModalItem(object)
        setModalType(type)
    };

    return (
        <div>

            <Board setShow={handleShowModal}/>
            <Modals show={show}
                    setShow={handleShowModal}
                    item={modalItem}
                    type={modalType}
            />
        </div>
    );
}

export default App;
