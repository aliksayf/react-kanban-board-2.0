import React from 'react';
import {Modal} from "react-bootstrap";
import TaskDetailsView from './TaskDetailsView';

function Modals(props) {
    // const [show, setShow] = useState(false);

    const handleClose = () => props.setShow();
    // const handleShow = () => props.setShow;
    console.log(props.item)

    switch (props.type) {
        case 'details':
            return (
                <>
                    <Modal show={props.show}
                           size="md"
                           onHide={handleClose}>
                        <TaskDetailsView item={props.item}/>
                    </Modal>
                </>
            );
            break;
        default :
            return (
                <>
                </>)
    }
}

export default Modals;