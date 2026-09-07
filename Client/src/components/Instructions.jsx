import React from 'react'
import { Link } from 'react-router-dom'

const Instructions = () => {
    return (
        <div className='min-h-screen w-full bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10'>

                <h1 className='text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2'>
                    Instructions
                </h1>
                <p className='text-sm text-gray-500 mb-6'>
                    Please read the following before you continue.
                </p>

                <ul className='space-y-3 text-sm md:text-base text-gray-700 list-disc list-inside'>
                    <li>Use your official university email to register or log in.</li>
                    <li>Students and Teachers have separate dashboards after login.</li>
                    <li>Make sure your role is selected correctly during registration.</li>
                    <li>Do not share your login credentials with anyone.</li>
                    <li>Contact admin if you face any issue accessing your dashboard.</li>
                    <li>The student must login with the same email and password after registeration</li>
                    <li>The teacher email is <span className='underline'>teacher@gmail.com</span> and password is <span className='underline'>teacher1122</span> </li>
                </ul>

                <div className='flex flex row gap-5'>
                    <Link to={"/student/login"}><button className='mt-8 w-full md:w-auto px-6 py-3 bg-[#526DB2] text-white rounded-lg text-sm font-medium hover:bg-[#455C99] transition-colors'>
                         Student Login
                    </button></Link>
                   <Link to={"/teacher/login"}> <button className='mt-8 w-full md:w-auto px-6 py-3 bg-[#526DB2] text-white rounded-lg text-sm font-medium hover:bg-[#455C99] transition-colors'>
                        Teacher Login
                    </button></Link>
                </div>

            </div>
        </div>
    )
}

export default Instructions