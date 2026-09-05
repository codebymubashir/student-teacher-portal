import React from 'react'
import Registersvg from "../../assets/register svg.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();



        try {
            const userCrediential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCrediential.user;


            await setDoc(doc(db, "students", user.uid), {
                name,
                department,
                email,
                createdAt: new Date().toISOString(),
            });

            toast.success("Registered Successfully")
            setTimeout(()=> navigate('/student/login'),1000)

        } catch (error) {
            toast.error(error.message);

        }
    }
    return (
        <>
        <ToastContainer position="top-center" autoClose={3000} />
            <div>
                <div className='bg-white w-full h-screen relative overflow-hidden'>
                    <div className='w-24 h-6 md:w-52 md:h-10 lg:w-72 lg:h-13 bg-gray-200 -skew-y-12 absolute top-16 md:top-52 lg:top-60 left-4 md:left-8 lg:left-15 animate-move-shape2'></div>
                    <div className='w-20 h-6 md:w-24 md:h-10 lg:w-32 lg:h-13 bg-green-200 -skew-y-12 absolute top-28 md:top-44 lg:top-56 right-4 md:right-20 lg:right-45 animate-move-shape'></div>
                    <div className='w-20 h-6 md:w-32 md:h-10 lg:w-42 lg:h-13 bg-orange-100 -skew-y-12 absolute top-44 left-4 md:top-20 lg:top-25 md:left-0 animate-move-shape3'></div>
                    <div className='w-24 h-6 md:w-40 md:h-10 lg:w-52 lg:h-13 bg-blue-200 -skew-y-12 absolute bottom-24 left-4 md:bottom-8 lg:bottom-10 md:left-0 animate-move-shape3'></div>
                    <div className='w-24 h-6 md:w-40 md:h-10 lg:w-52 lg:h-13 bg-red-200 -skew-y-12 absolute bottom-8 right-4 md:bottom-12 lg:bottom-15 md:right-10 lg:right-15 animate-move-shape3'></div>
                    <div className='w-210 h-120 rounded-2xl bg-white shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                        <div className='w-200 h-110  md:flex md:flex-row  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white'>
                            <div className='w-[50%] h-full rounded-2xl relative flex-1 bg-[#526DB2] p-6 md:p-8 flex flex-col justify-between md:[clip-path:polygon(0_0,100%_0,94%_100%,0%_100%)]'>
                                <Link to={"/student/login"}> <div className='flex justify-end'>
                                    <button className='border border-white/70 text-white px-5 py-1.5 rounded-full text-xs hover:bg-white/10 transition'>
                                        Sign in
                                    </button>
                                </div></Link>
                                <div className='mr-5'>
                                    <img src={Registersvg} alt="" />
                                </div>
                                <div className='w-full h-25 text-white absolute top-25'>
                                    <h2 className='font-bold frances text-[38px] uppercase leading-12 italic  '>Welcome to <br /> learn <span className='frances font-bold text-white text-[60px] italic'>X.</span> </h2>
                                </div>

                            </div>
                            <div className='w-[50%] h-full'>
                                <div className='w-full h-auto p-2  text-center mt-2 mb-2'>
                                    <h2 className='text-4xl frances '>Student Portal</h2>
                                </div>
                                <form className="space-y-4" onSubmit={handleRegister}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-2 frnaces ">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e)=>setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-95 ml-2 px-4 py-1.5 border border-gray-300 rounded-2xl focus:outline-none  focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400" />
                                    </div>

                                    <div>
                                        <label className="block frances text-sm font-medium text-gray-700 mb-1 ml-2 frnaces ">Department</label>
                                        <input
                                            type="text"
                                            value={department}
                                            onChange={(e)=>setDepartment(e.target.value)}
                                            placeholder="Enter your department name"
                                            className="w-95 ml-2 px-4 py-1.5 border border-gray-300 rounded-2xl focus:outline-none  focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 ml-2 frances mb-1">Email Address</label>
                                        <input
                                            type='email'
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-95 ml-2 px-4 py-1.5 border border-gray-300 rounded-2xl focus:outline-none  focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 ml-2 frances mb-1">Password</label>
                                        <div className="relative w-95 ml-2">
                                            <input
                                                value={password}
                                                onChange={(e)=>setPassword(e.target.value)}
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                placeholder="*******"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                className="w-full px-4 py-1.5 pr-9 border border-gray-300 rounded-2xl focus:outline-none focus:bg-[#e8f0fe] text-sm text-gray-700 placeholder-gray-400" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                                {showPassword ? '🙈' : '👁️'}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-95 py-4 px-4 ml-2  bg-[#526db2] hover:bg-[#3f5296] text-white font-medium rounded-full text-sm transition-colors shadow-sm">Register</button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
