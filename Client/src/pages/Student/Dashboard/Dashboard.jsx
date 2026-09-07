import React from 'react'
import { House,BookOpen,CalendarDays,Wallet,CalendarPlus2,Trophy,NotebookText,UserRoundPen,LogOut } from 'lucide-react';

const Dashboard = () => {
  return (
    <>
    <div className='w-60 h-auto border-2 rounded-2xl ml-4 mt-4'>

        {/* main top logo and name of institute */}
        <div className='w-full h-15 p-2  flex flex-row items-center gap-2 '>
            <div className='dashlogo w-10 h-10 rounded-full'>

            </div>
            <div>
                <p className=' text-2xl font-bold frances'>Learn<span className='text-[#526DB2]'>X.</span> </p>
            </div>

        </div>

        {/* Main Menu */}

        <div className='w-full h-auto mt-6 p-2'>
            <p className='uppercase text-md
             text-[#9CA3AF] ml-2 '>Menu</p>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <House size={20} className='' />
                <p className='text-md '>Dashboard</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 rounded-xl'>
                <BookOpen size={20} className=' text-[#6B7280]' />
                <p className='text-md text-[#6B7280]'>Course Content</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <CalendarDays  size={20} className='' />
                <p className='text-md '>Attendence</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <Wallet  size={20} className='' />
                <p className='text-md '>Fees</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <CalendarPlus2  size={20} className='' />
                <p className='text-md '>Leaves</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <NotebookText   size={20} className='' />
                <p className='text-md '>Assignments</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <Trophy   size={20} className='' />
                <p className='text-md '>Competitons</p>
             </div>
             <div className=' p-2 mt-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <UserRoundPen   size={20} className='' />
                <p className='text-md '>Profile</p>
             </div>
             <div className=' p-2 mt-2 mb-2 flex flex-row items-center gap-2 text-[#6B7280] rounded-xl'>
                <LogOut   size={20} className='' />
                <p className='text-md '>Log Out</p>
             </div>


        </div>





    </div>
    </>
  )
}

export default Dashboard
