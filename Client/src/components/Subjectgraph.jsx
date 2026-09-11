import React from 'react'
import { getUser } from '../Backend/auth';


const Subjectgraph = () => {

    const user = getUser();
    const role = (user?.role || user?.userRole || 'student').toLowerCase();

    const subjects = [
        { name: 'HTML', value: 52 },
        { name: 'CSS', value: 41 },
        { name: 'Javascript', value: 58 },
        { name: 'React Js', value: 65 },
        { name: 'Docs', value: 75 },
    ]
    return (
        <div className='bg-white rounded-2xl shadow-sm p-5'>
            <h3 className='text-xl font-bold mb-4'>
                {role === 'student'
                    ? 'Subject Grade'
                    : 'MY Lectures'}
            </h3>

            <div className='flex flex-col gap-3'>
                {subjects.map((item) => (
                    <div key={item.name} className='relative h-11 bg-gray-100 rounded-lg overflow-hidden'>
                        <div
                            className='h-full bg-[#C7D2FE] rounded-lg flex items-center px-4'
                            style={{ width: `${item.value}%` }}
                        >
                            <span className='text-sm font-medium text-gray-800'>{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Subjectgraph
