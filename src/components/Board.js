import React,  { useState } from "react";
import { tasks, status, colors } from '../data/tasks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import TaskCard from "./TaskCard";
import TaskDetailsView from "./TaskDetailsView";

const onDragEnd = (result, taskList, setTaskList) => {
    if(!result.destination) return;
    const { source, destination } = result;
    const column = _.cloneDeep(taskList);
    if (source.droppableId !== destination.droppableId) {

        const sourceColumn = column[source.droppableId];
        const destColumn = column[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        column[source.droppableId].items = sourceItems
        column[destination.droppableId].items = destItems
        console.log('cl', column)
        setTaskList(column)
    } else {
        const [removed] = column[source.droppableId].items.splice(source.index, 1)           // source.index - index of dragged item
        column[source.droppableId].items.splice(destination.index, 0, removed)    // destination.index - index of place where dragged item came to
        setTaskList(column)
    }
};
    const newArr = [...status]
    tasks.map(el => newArr[el.status - 1].items.push(el))

export default function Board() {

    const [taskList, setTaskList] = useState(newArr)
    const [modal, setModal] =  useState('modal')

    return (
        <div className='board' >
            <DragDropContext onDragEnd={result => onDragEnd(result, taskList, setTaskList)}>
                {Object.entries(taskList).map(([id, column], idx) => {
                    return (
                        <div className='d-flex flex-column align-items-center mt-5'
                             key={id}
                             >
                            <div className='m-1' >
                                <h5 className={'text-secondary align-center title-border border-' + colors[idx]}>
                                    {column.name}  {column.items.length}  </h5>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={snapshot.isDraggingOver ? 'group lightblue' : 'group lightgrey'}
                                            >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                        return (
                                                                            <div ref={provided.innerRef}
                                                                                 {...provided.draggableProps}
                                                                                 {...provided.dragHandleProps}
                                                                                 // style={{...provided.draggableProps.style}}
                                                                                 className={snapshot.isDragging ? 'item dimgrey' : 'item white'}
                                                                            >
                                                                                <TaskCard item={item} modal={modal} setModal={setModal}/>
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
