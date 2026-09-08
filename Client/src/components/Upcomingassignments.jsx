import React from 'react'

const assignments = [
  {
    title: 'Database Design Report',
    subject: 'Database Systems',
    status: 'Due Tomorrow',
    badgeColor: 'bg-red-100 text-red-600',
  },
  {
    title: 'React Component Assignment',
    subject: 'Web Development',
    status: '3 days left',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Networking Quiz Prep',
    subject: 'Computer Networks',
    status: '1 week left',
    badgeColor: 'bg-green-100 text-green-700',
  },
]

const UpcomingAssignments = () => {
  return (
    <div className='bg-white rounded-2xl shadow-sm p-5 w-[45%]'>
      <h3 className='text-base font-bold text-gray-900 mb-4'>Upcoming Assignments</h3>

      <div className='flex flex-col gap-3'>
        {assignments.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              index !== assignments.length - 1 ? 'pb-3 border-b border-gray-100' : ''
            }`}
          >
            <div>
              <p className='text-sm font-semibold text-gray-800'>{item.title}</p>
              <p className='text-xs text-gray-400 mt-0.5'>{item.subject}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingAssignments