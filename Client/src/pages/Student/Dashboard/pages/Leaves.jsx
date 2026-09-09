import React from 'react'
import { ScrollText } from 'lucide-react';
const Leaves = () => {
  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">

        {/* Top Banner */}
        <div className='bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
            Student Leaves
          </span>
          <h1 className="text-2xl font-bold mt-2">Leaves</h1>
          <p className="text-sm opacity-90 mt-1">View your leave history and download the applications</p>
        </div>
        <button className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition">
          Apply for Leave
        </button>
      </div>



      {/* leave application */}

      <div className='bg-[white] rounded-2xl p-4 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='w-full h-full border rounded-2xl border-dashed flex justify-center'>
            <div className='text-[#ccd6e2] flex flex-col p-20 '>
                <ScrollText size={40} className='ml-7'/>
                <p className=''>No Leaves yet</p>
            </div>

        </div>

      </div>
      
    </div>
  )
}

export default Leaves
