'use client'
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { createaccount } from "@/redux/AuthenticationReducer";
import { useSelector, useDispatch } from 'react-redux'
import { Toaster, toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
    const router = useRouter();
    const [data, setdata] = useState({ fullName: "", email: "", password: "" });
    const dispatch = useDispatch();
    function handlechange(e) {
        const { name, value } = e.target
        setdata({ ...data, [name]: value })
    }
    async function HandleSubmit() {
        try {
            const response = await dispatch(createaccount(data));
            console.log(response);
            router.push('/verify')
        }
        catch (err) {
            toast.error("Failed to create account", { autoClose: 3000 })
            console.log(err);
        }
    }
    return (
        <>
            <div className="min-h-screen flex bg-new-custom bg-cover bg-center h-screen">
            <div className="hidden md:flex w-1/2 
 justify-center items-center">
                </div>
                <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 py-16 ">
                    <div className="bg-white p-4 rounded-xl">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">Create an Account</h2>
                        <Link href="/signin" className="text-2xl pb-8 font-bold mb-14 text-gray-800">Already? have an Account</Link>
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-sm font-medium text-gray-600 mt-4 shadow-2xl">
                                FullName
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="fullName"
                                value={data.fullName}
                                onChange={handlechange}
                                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handlechange}
                                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handlechange}
                                className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <button
                            onClick={HandleSubmit}
                            className="w-full px-6 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        >
                            Sign Up
                        </button>
                        <Toaster />
                    </div>
                </div>
                
            </div>
        </>
    )
};