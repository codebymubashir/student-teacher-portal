import React from 'react'
import { House, BookOpen, CalendarDays, Wallet, CalendarPlus2, Trophy, NotebookText, UserRoundPen, LogOut } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Dashboard = () => {
    return (
        <div className='flex'>
            <div className='w-60 h-auto   shadow-xl rounded-2xl ml-4 mt-6  fixed'>

                {/* main top logo and name of institute */}
                <div className='w-full h-15 p-2  flex flex-row items-center gap-2   '>
                    <div className='dashlogo w-10 h-10 rounded-full'>

                    </div>
                    <div>
                        <p className=' text-2xl font-bold frances'>Learn<span className='text-[#526DB2]'>X.</span> </p>
                    </div>

                </div>

                {/* Main Menu */}

                <div className='w-full h-auto mt-6 p-2'>
                    <p className='uppercase text-xs font-bold
             text-[#9CA3AF] ml-2 '>Menu</p>
                    <NavLink
                        to={'home'}
                        end
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <House size={20} />
                        <p className='text-md'>Dashboard</p>
                    </NavLink>
                    <NavLink
                        to={'content'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <BookOpen size={20} className='' />
                        <p className='text-md '>Course Content</p>
                    </NavLink>
                    <NavLink
                        to={'attendence'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <CalendarDays size={20} className='' />
                        <p className='text-md '>Attendence</p>
                    </NavLink>
                    <NavLink
                        to={'fees'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <Wallet size={20} className='' />
                        <p className='text-md '>Fees</p>
                    </NavLink>
                    <NavLink
                        to={'leaves'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <CalendarPlus2 size={20} className='' />
                        <p className='text-md '>Leaves</p>
                    </NavLink>
                    <NavLink
                        to={'assignments'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <NotebookText size={20} className='' />
                        <p className='text-md '>Assignments</p>
                    </NavLink>
                    <NavLink
                        to={'competitions'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <Trophy size={20} className='' />
                        <p className='text-md '>Competitons</p>
                    </NavLink>
                    <NavLink
                        to={'profile'}
                        className={({ isActive }) =>
                            `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280]'
                            }`
                        }
                    >
                        <UserRoundPen size={20} className='' />
                        <p className='text-md '>Profile</p>
                    </NavLink>
                    <div className=' p-2 mt-2 mb-2 dashmenu font-semibold flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                        <LogOut size={20} className='' />
                        <p className='text-md '>Log Out</p>
                    </div>


                </div>





            </div>
            <div className='flex-1 ml-64'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard