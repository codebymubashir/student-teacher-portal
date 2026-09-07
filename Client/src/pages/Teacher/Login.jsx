import React, { useState } from 'react';
import Registersvg from "../../assets/register svg.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const teacherLogin = (e) => {
        e.preventDefault();
        
        const teacherEmail = "teacher@gmail.com";
        const teacherPassword = "teacher1122";

        if (email === teacherEmail && password === teacherPassword) {
            toast.success("Successfully Logged In");       
        } else {
            toast.error("Invalid Teacher Credential");
        }
    };

    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />

            <div className='bg-white w-full h-screen relative overflow-hidden'>
                <div className='w-24 h-6 md:w-52 md:h-10 lg:w-72 lg:h-13 bg-gray-200 -skew-y-12 absolute top-16 md:top-52 lg:top-60 left-4 md:left-8 lg:left-15 animate-move-shape2'></div>
                <div className='w-20 h-6 md:w-24 md:h-10 lg:w-32 lg:h-13 bg-green-200 -skew-y-12 absolute top-28 md:top-44 lg:top-56 right-4 md:right-20 lg:right-45 animate-move-shape'></div>
                <div className='w-20 h-6 md:w-32 md:h-10 lg:w-42 lg:h-13 bg-orange-100 -skew-y-12 absolute top-44 left-4 md:top-20 lg:top-25 md:left-0 animate-move-shape3'></div>
                <div className='w-24 h-6 md:w-40 md:h-10 lg:w-52 lg:h-13 bg-blue-200 -skew-y-12 absolute bottom-24 left-4 md:bottom-8 lg:bottom-10 md:left-0 animate-move-shape3'></div>
                <div className='w-24 h-6 md:w-40 md:h-10 lg:w-52 lg:h-13 bg-red-200 -skew-y-12 absolute bottom-8 right-4 md:bottom-12 lg:bottom-15 md:right-10 lg:right-15 animate-move-shape3'></div>
                <div className='w-210 h-120 rounded-2xl bg-white shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                    <div className='w-200 h-110 md:flex md:flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white'>
                        <div className='w-[50%] h-full rounded-2xl relative flex-1 bg-[#526DB2] p-6 md:p-8 flex flex-col justify-between md:[clip-path:polygon(0_0,100%_0,94%_100%,0%_100%)]'>
                            <div className='mr-5 mt-54'>
                                <img src={Registersvg} alt="Register illustration" />
                            </div>
                            <div className='w-full h-25 text-white absolute top-13'>
                                <h2 className='font-bold frances text-[38px] uppercase leading-12 italic'>
                                    Welcome to <br /> learn <span className='frances font-bold text-white text-[60px] italic'>X.</span>
                                    
                                </h2>
                                <p className='text-white text-base mt-3'>Manage your classes, track progress, <br /> and empower your students</p>
                            </div>
                        </div>

                        <div className='w-[50%] h-full'>
                            <div className='w-full h-auto p-2 text-center mt-8 mb-7'>
                                <h2 className='text-4xl frances '>Teacher Portal</h2>
                            </div>
                            <form className="space-y-4" onSubmit={teacherLogin}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-2 frances">Department Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your department name"
                                        className="w-95 ml-2 px-4 py-1.5 border border-gray-300 rounded-2xl focus:outline-none focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-2 frances">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-95 ml-2 px-4 py-1.5 border border-gray-300 rounded-2xl focus:outline-none focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                               <div>
                                        <label className="block text-sm font-medium text-gray-700 ml-2 frances mb-1">Password</label>
                                        <div className="relative w-95 ml-2">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="*******"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                className="w-full px-4 py-1.5 pr-9 border border-gray-300 rounded-2xl focus:outline-none focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400"/>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                                {showPassword ? '🙈' : '👁️'}
                                            </button>
                                        </div>
                                    </div>

                                <div className="flex items-center justify-between pt-1 pl-3 pr-3">
                                    <label className="flex items-center text-xs text-gray-600 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2 h-4 w-4"
                                        />
                                        Remember me
                                    </label>
                                    <a href="#" className="text-xs text-gray-600 hover:text-indigo-600 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-95 py-4 px-4 ml-2 bg-[#526db2] hover:bg-[#3f5296] text-white font-medium rounded-full text-sm transition-colors shadow-sm"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;