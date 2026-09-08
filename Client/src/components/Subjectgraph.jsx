import React from 'react'

const Subjectgraph = () => {

    const subjects = [
        { name: 'Biology', value: 52 },
        { name: 'Chemistry', value: 41 },
        { name: 'Math', value: 58 },
        { name: 'Urdu', value: 65 },
        { name: 'English', value: 75 },
    ]
    return (
        <div className='bg-white rounded-2xl shadow-sm p-5'>
            <h3 className='text-xl font-bold mb-4'>Grade by Subject</h3>

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
