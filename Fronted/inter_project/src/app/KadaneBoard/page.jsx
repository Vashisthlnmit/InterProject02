'use client'
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDispatch } from "react-redux";
import { GetAllTask } from '@/redux/TaskReducer';
import toast, { Toaster } from 'react-hot-toast';
import { UpdatedTask } from '@/redux/TaskReducer';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const fetchTasks = async () => {
    try {
      const response = await dispatch(GetAllTask()); // Update with your API endpoint
      const data = response.payload.data.data;
      const todo = data.filter(task => task?.Status == 'To Do');
      const inProgress = data.filter(task => task?.Status == 'In Progress');
      const completed = data.filter(task => task.Status == 'Completed');

      setTasks({ todo, inProgress, completed });
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn !== destinationColumn) {
      const task = tasks[sourceColumn][source.index];

      let newStatus;
      if (destinationColumn === "todo") {
        newStatus = "To Do";
      } else if (destinationColumn === "inProgress") {
        newStatus = "In Progress";
      } else {
        newStatus = "Completed";
      }

      try {
        const response = await dispatch(UpdatedTask({ taskid: result.draggableId, Status: newStatus }));

        const isUpdateSuccessful = response?.payload?.data?.success;
        if (isUpdateSuccessful) {
          const updatedTask = { ...task, Status: newStatus };

          const sourceTasks = Array.from(tasks[sourceColumn]);
          sourceTasks.splice(source.index, 1);

          const destinationTasks = Array.from(tasks[destinationColumn]);
          destinationTasks.splice(destination.index, 0, updatedTask);

          setTasks({
            ...tasks,
            [sourceColumn]: sourceTasks,
            [destinationColumn]: destinationTasks,
          });

          toast.success("Task status updated successfully");
        } else {
          toast.error("Failed to update task status");
        }
      } catch (err) {
        toast.error("Failed to update task status");
        console.error(err);
      }
    }
  };

  return (
    <>
    <div className='overflow-hidden bg-custom-image bg-cover bg-center h-screen'>
      <h1 className='text-4xl m-5  font-extrabold font-sans text-center'>Kanban Board Screen</h1>
      <DragDropContext onDragEnd={handleDragEnd} className="my-2">
        {/* Responsive grid: 1 column on small screens, 3 columns on medium+ screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {/* To Do Column */}
          <Column droppableId="todo" tasks={tasks.todo} title="To Do" />

          {/* In Progress Column */}
          <Column droppableId="inProgress" tasks={tasks.inProgress} title="In Progress" />

          {/* Completed Column */}
          <Column droppableId="completed" tasks={tasks.completed} title="Completed" />
        </div>
        <Toaster />
      </DragDropContext>
    </div>
    </>
  );
};

const Column = ({ droppableId, tasks, title }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="p-4 bg-gray-700 opacity-60 rounded-lg min-h-[300px] mx-4" // Ensure minimum height for columns
        >
          <h2 className="font-bold text-lg mb-2">{title}</h2>
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white p-2 mb-2 rounded shadow"
                >
                  {task?.Title}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanBoard;
