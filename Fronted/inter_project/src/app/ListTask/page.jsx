'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTask, DeleteTask } from "@/redux/TaskReducer"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select";
import { Delete } from "lucide-react"
export default function ListView() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setdata] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    function SortOnPriority() {
        const priorityOrder = ["Low", "Medium", "High"];
        const sortedTasks = [...data].sort((a, b) => {
            return priorityOrder.indexOf(a.Priority) - priorityOrder.indexOf(b.Priority);
        });
        setdata(sortedTasks);
    }

    function SortOnStatus() {
        const statusOrder = ["To Do", "In Progress", "Completed"];
        const sortedTasks = [...data].sort((a, b) => {
            return statusOrder.indexOf(b.Status) - statusOrder.indexOf(a.Status);
        });
        setdata(sortedTasks);
    }

    function FilteronStatus(value) {
        setStatusFilter(value);
    }

    function FilteronPriority(value) {
        setPriorityFilter(value);
    }

    function HandleRedirect(_id, Title, Description, Status, Priority, Due_Date) {
        const data = { _id, Title, Description, Status, Priority, Due_Date };
        const queryString = new URLSearchParams(data).toString();
        router.push(`/EditTask?${queryString}`);
    }

    async function DeleteHandler(taskid) {
        const answer = window.confirm("Are you sure you want to delete this task?");
        if (answer) {
            try {
                const resp = await dispatch(DeleteTask(taskid));
                if (resp?.payload?.data?.data?.success) {
                    toast.success("Task deleted successfully");
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to delete task");
            }
        }
    }
    ////onValueChange={(value) => FilteronStatus(value)}
    async function GetAllTaskHandler() {
        try {
            const resp = await dispatch(GetAllTask());
            let tasks = resp.payload.data.data;
            if (statusFilter && statusFilter != "*") {
                setStatusFilter(statusFilter)
                tasks = tasks.filter(task => task.Status === statusFilter);
            }
            if (priorityFilter && priorityFilter != "*") {
                setPriorityFilter(priorityFilter)
                tasks = tasks.filter(task => task.Priority === priorityFilter);
            }
            setdata(tasks);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        GetAllTaskHandler();
    }, [statusFilter, priorityFilter]);

    return (
        <>
            <div className='overflow-hidden bg-custom-image bg-cover bg-center h-screen'>
                <header className="p-4 text-white flex flex-col sm:flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold mb-2 sm:mb-0">ALL Your Task List</h1>
                    <div className="flex space-x-2">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                            onClick={SortOnPriority}
                        >
                            Priority Sort
                        </button>

                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                            onClick={SortOnStatus}
                        >
                            Status Sort
                        </button>
                        <div>
                            <Select >
                                <SelectTrigger className="w-full" onValueChange={(value) => FilteronStatus(value)}>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Filter on Priority</SelectLabel>
                                        <SelectItem value="*">All Status</SelectItem>
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select onValueChange={(value) => FilteronPriority(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Filter on Status</SelectLabel>
                                        <SelectItem value="*">All Priority</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </header>
                <Table>
                    <TableCaption>A list of Your Tasks.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="sm:flex-row">
                        {data?.map((task) => (
                            <TableRow key={task?.id}>
                                <TableCell className="text-white">{task?.Title || ""}</TableCell>
                                <TableCell className="text-white">{task?.Status || ""}</TableCell>
                                <TableCell className="text-white">{task?.Description || ""}</TableCell>
                                <TableCell className="text-white">{task?.Priority || ""}</TableCell>
                                <TableCell className="text-white">{task?.Due_Date || ""}</TableCell>
                                <TableCell>
                                    <Button
        
                                        className="rounded-xl bg-gradient-to-r from-blue-950 to-blue-500"
                                        onClick={() => HandleRedirect(task._id, task.Title, task.Description, task.Status, task.Priority, task.Due_Date)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="rounded-xl bg-gradient-to-r from-red-950 to-red-500"
                                        onClick={() => DeleteHandler(task._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Toaster />
            </div>
        </>
    )
}
