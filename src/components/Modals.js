import React from 'react';
import {Modal} from "react-bootstrap";
import TaskDetailsView from './TaskDetailsView';
import TaskEditView from './TaskEditView';

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
                           size="lg"
                           onHide={handleClose}>
                        <TaskDetailsView item={props.item} setShow={props.setShow}/>
                    </Modal>
                </>
            );
            break;

        case 'edit':
            return (
                <>
                    <Modal show={props.show}
                           size="lg"
                           onHide={handleClose}>
                        <TaskEditView item={props.item} setShow={props.setShow}/>
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