import React,  { useState } from "react";
import { tasks, status } from '../data/tasks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import _ from 'lodash';

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
    // console.log(taskList)

    return (
        <div className='board' >
            <DragDropContext onDragEnd={result => onDragEnd(result, taskList, setTaskList)}>
                {Object.entries(taskList).map(([id, column]) => {
                    return (
                        <div style={{
                            display: 'flelx',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                             key={id}
                             >
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8}}>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className='group'
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                }}
                                            >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div ref={provided.innerRef}
                                                                             {...provided.draggableProps}
                                                                             {...provided.dragHandleProps}
                                                                             className='item'
                                                                             style={{
                                                                                 backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                                 ...provided.draggableProps.style
                                                                             }}
                                                                        >
                                                                            {item.name}
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
