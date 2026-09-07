import React from 'react'
import { School, CalendarDays, Phone, MailPlus } from 'lucide-react';

const Home = () => {
    return (

        <>
            <div className='w-[70%]  rounded-2xl ml-6 bg-[#99b2f1] h-50 p-4 mt-4 flex flex-row'>

                <div className='homedp w-38 h-38 mt-2 ml-5 rounded-full  bg-white'></div>
                <div className='w-[80%] h-full  pl-8'>
                    <h2 className='text-4xl font-semibold monospace mt-2'>Welcome, Mubashir</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, repudiandae!</p>
                    <div className='grid grid-cols-2 mt-6 ml-2'>
                        <div className='flex items-center gap-2'>
                            <School size={15} />
                            <p>Information Technology</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MailPlus size={15} />
                            <p>mubashir@gmail.com</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <CalendarDays size={15} />
                            <p>November,2026</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Phone size={15} />
                            <p>0304-3645491</p>
                        </div>
                    </div>
                </div>


            </div>


        </>
    )
}

export default Home
