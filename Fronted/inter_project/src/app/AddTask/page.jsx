'use client';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddTask } from "@/redux/TaskReducer";
import { useState } from "react";

export default function AddTaskForm() {
  const dispatch = useDispatch();
  const [taskdata, setTask] = useState({ Title: "", Description: "", Status: "", Priority: "" });
  const [date, setDate] = useState();

  async function handleAddTask() {
    const data = { Title: taskdata.Title, Description: taskdata.Description, Status: taskdata.Status, Priority: taskdata.Priority, Due_Date: date };
    try {
      const resp = await dispatch(AddTask(data));
      if (resp?.payload?.data?.sucess) {
        setTask({ Title: "", Description: "", Status: "", Priority: "" });
        setDate(null);
        toast.success("Tasks created Successfully")
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Failed to create task")
    }
  }

  return (
    <div className='overflow-hidden bg-custom-image bg-cover bg-center h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl md:px-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Task</h2>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <label htmlFor="title" className="text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={taskdata.Title}
              onChange={(e) => setTask({ ...taskdata, Title: e.target.value })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="w-full md:w-1/2">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={taskdata.Description}
              onChange={(e) => setTask({ ...taskdata, Description: e.target.value })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
          <div className="w-full md:w-1/2">
            <Select onValueChange={(value) => setTask({ ...taskdata, Status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2">
            <Select onValueChange={(value) => setTask({ ...taskdata, Priority: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <button
          onClick={handleAddTask}
          className="w-full px-6 py-2 mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 "
        >
          Add Task
        </button>
        <Toaster />
      </div>
    </div>
  );
}
