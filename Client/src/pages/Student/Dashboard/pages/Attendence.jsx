import React, { useState } from 'react';

const Attendance = () => {
  const [dateFilter, setDateFilter] = useState('');
  
  const attendanceData = [
    { id: 1, date: '2026-09-08', status: 'Present', note: '—' },
    { id: 2, date: '2026-09-03', status: 'Present', note: '—' },
    { id: 3, date: '2026-09-01', status: 'Present', note: '—' },
    { id: 4, date: '2026-08-31', status: 'Present', note: '—' },
    { id: 5, date: '2026-08-27', status: 'Present', note: '—' },
    { id: 6, date: '2026-08-20', status: 'Present', note: '—' },
    { id: 7, date: '2026-08-18', status: 'Present', note: '—' },
    { id: 8, date: '2026-08-10', status: 'Leave', note: 'Medical Leave Approved' },
  ];

  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">
      
      {/* Top Banner */}
      <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
            Information Technology
          </span>
          <h1 className="text-2xl font-bold mt-2">Attendance Dashboard</h1>
          <p className="text-sm opacity-90 mt-1">Track your daily class attendance and status records</p>
        </div>
        <button className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition">
          Apply For Leave
        </button>
      </div>

      {/* Date Filter Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="attendance-date-filter" className="text-xs font-semibold text-slate-600">Filter Date:</label>
          <input
            id="attendance-date-filter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#9BB2F6] text-slate-700 bg-gray-50"
          />
        </div>
        <div className="text-xs text-slate-500">
          Showing records for: <span className="font-semibold text-slate-800">Fall Semester 2026</span>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Present Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-emerald-600">29</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Present</span>
        </div>

        {/* Absent Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-rose-500">0</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Absent</span>
        </div>

        {/* Leave Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-amber-500">1</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Leave</span>
        </div>

        {/* Overall Percentage Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-800">97%</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Overall Percentage</span>
        </div>

      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {attendanceData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition">
                  {/* Date */}
                  <td className="p-4 pl-6 font-medium text-slate-800">{row.date}</td>

                  {/* Status Badge */}
                  <td className="p-4">
                    {row.status === 'Present' && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200/60">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Present
                      </span>
                    )}
                    {row.status === 'Leave' && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200/60">
                        📄 Leave
                      </span>
                    )}
                    {row.status === 'Absent' && (
                      <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full border border-rose-200/60">
                        ✕ Absent
                      </span>
                    )}
                  </td>

                  {/* Note */}
                  <td className="p-4 pr-6 text-gray-400 font-normal">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Attendance;