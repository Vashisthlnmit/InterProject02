"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { authin } from "@/redux/AuthenticationReducer";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
//import profile from '/Fronted/inter_project/public/signin-banner.png'

export default function Signin() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setData] = useState({ email: "", password: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function handleSubmit() {
        try {
            const resp = await dispatch(authin(data));
            if (resp?.payload?.data?.message) {
                toast.success(resp?.payload?.data?.message);
                setIsSubmitted(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            router.push('/');
        }
    }, [isSubmitted, router]);

    return (
        <div className="min-h-screen flex bg-new-custom bg-cover bg-center h-screen">
            <div className="hidden md:flex w-1/2 
 justify-center items-center"></div>
            <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 py-16">
                <div className="bg-white p-4 rounded-xl">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Login in</h2>
                    <Link href="/signup" className="text-3xl font-bold mb-8 text-gray-800">Do not have Account</Link>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full px-6 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Sign in
                    </button>

                </div>
            </div>
            <Toaster />
        </div>
    );
}
