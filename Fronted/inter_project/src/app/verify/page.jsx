'use client';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Image from 'next/image';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useDispatch } from 'react-redux';
import { Verify } from '@/redux/AuthenticationReducer';
import { useRouter } from 'next/navigation';
export default function Verification() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setData] = useState({ email: '' });
    const [value, setValue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function handleSubmit() {
        const finalData = { email: data.email, verifycode: value };
        try {
            const resp = await dispatch(Verify(finalData));
            if (resp?.payload?.data?.message) {
                toast.success("signin successfully")
                setValue('');
                setData({ email: '' });
                setIsSubmitted(true);
            }
        } catch (err) {
            console.log(err);
            toast.error('Failed to verify account');
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            router.push('/signin');
        }
    }, [isSubmitted, router]);

    return (
        <>
            <div className="min-h-screen flex bg-new-custom bg-cover bg-center h-screen">
                <div className="hidden md:flex w-1/2 
 justify-center items-center"></div>
                <div className='flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 py-16'>
                    <div className="bg-white p-4 rounded-xl">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">
                            Verify an Account
                        </h2>
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
                                One-Time Password
                            </label>
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                onChange={(value) => setValue(value)}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <button
                            type="button"
                            className="w-full px-6 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Verify Account
                        </button>
                    </div>
                </div>
                <Toaster />
            </div>
        </>
    );
}
