import React from "react";
import {colors} from '../data/tasks';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import _ from 'lodash';
import TaskCard from "./TaskCard";

const onDragEnd = (result, taskList, setTaskList) => {
    if (!result.destination) return;
    const {source, destination} = result;
    const column = _.cloneDeep(taskList);
    if (source.droppableId !== destination.droppableId) {

        const sourceColumn = column[source.droppableId];
        const destColumn = column[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        const removedId = removed.id
        destItems.splice(destination.index, 0, removed);
        column[source.droppableId].items = sourceItems
        column[destination.droppableId].items = destItems
        column.map((el, idx) => el.items.map(task => task.id === removedId ? task.status = idx + 1 : ''))
        setTaskList(column)
    } else {
        const [removed] = column[source.droppableId].items.splice(source.index, 1)           // source.index - index of dragged item
        column[source.droppableId].items.splice(destination.index, 0, removed)    // destination.index - index of place where dragged item came to
        setTaskList(column)
    }
};

export default function Board(props) {

    const taskList = props.taskList
    // const [taskList, setTaskList] = useState(props.taskList)
    const setTaskList = props.setTaskList

    return (
        <div className='board'>
            <DragDropContext onDragEnd={result => onDragEnd(result, taskList, setTaskList)}>
                {Object.entries(taskList).map(([id, column], idx) => {
                    return (
                        <div className='d-flex flex-column align-items-center mt-5'
                             key={id}
                        >
                            <div className='m-1'>
                                <h6 className={'text-secondary align-center title-border border-' + colors[idx]}>
                                    {column.name.toUpperCase()} {column.items.length}  </h6>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={snapshot.isDraggingOver ? 'group target-col' : 'group status-col'}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div ref={provided.innerRef}
                                                                         {...provided.draggableProps}
                                                                         {...provided.dragHandleProps}
                                                                         onClick={() => props.setShow(item, 'details')}
                                                                        // style={{...provided.draggableProps.style}}
                                                                         className={snapshot.isDragging ? 'item dragging' : 'item'}
                                                                    >
                                                                        <TaskCard item={item}/>
                                                                            </div>
                                                                        )
                                                                }}
                                                            </Draggable>
                                                        );
                                                    } )}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}
