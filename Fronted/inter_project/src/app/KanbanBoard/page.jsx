// pages/index.js
'use client'
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialTasks = {
  'to-do': [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
  ],
  'in-progress': [
    { id: 'task-3', content: 'Task 3' },
  ],
  'completed': [
    { id: 'task-4', content: 'Task 4' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const updatedTasks = Array.from(start);
      updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, tasks[draggableId]);
      setTasks({ ...tasks, [source.droppableId]: updatedTasks });
    } else {
      const startTasks = Array.from(start);
      const finishTasks = Array.from(finish);
      startTasks.splice(source.index, 1);
      finishTasks.splice(destination.index, 0, tasks[draggableId]);
      setTasks({
        ...tasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(tasks).map((columnId) => (
        <Droppable key={columnId} droppableId={columnId}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ margin: 8, padding: 8, width: 300, minHeight: 500, backgroundColor: '#f4f4f4' }}
            >
              <h3>{columnId.replace('-', ' ').toUpperCase()}</h3>
              {tasks[columnId].map((task, index) => (
                <Draggable key={task?.id} draggableId={task?.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: 8,
                        marginBottom: 8,
                        backgroundColor: '#fff',
                        borderRadius: 4,
                        ...provided.draggableProps.style,
                      }}
                    >
                      {task?.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default KanbanBoard;
