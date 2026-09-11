import React from 'react'
import { getUser } from '../../../../Backend/auth'

const Fees = () => {

  const user = getUser();
  const role = (user?.role || user?.userRole || 'student').toLowerCase();

  // Student fee history
  const studentFeesReport = [
    { id: 'FEE-001', type: 'Monthly', amount: 6000, paid: 6000, due: '2026-06-23', status: 'Paid', method: 'Cash' },
    { id: 'FEE-002', type: 'Monthly', amount: 6000, paid: 6000, due: '2026-05-23', status: 'Paid', method: 'Jazzcash' },
    { id: 'FEE-003', type: 'Monthly', amount: 6000, paid: 6000, due: '2026-04-23', status: 'Paid', method: 'Cash' },
    { id: 'FEE-004', type: 'Monthly', amount: 6000, paid: 6000, due: '2026-03-23', status: 'Paid', method: 'Cash' },
    { id: 'FEE-005', type: 'Monthly', amount: 6000, paid: 0, due: '2026-02-23', status: 'Unpaid', method: '—' },
    { id: 'FEE-006', type: 'Monthly', amount: 6000, paid: 6000, due: '2026-01-23', status: 'Paid', method: 'Bank Transfer' },
  ];

  // Teacher salary history
  const teacherSalaryReport = [
    { id: 'SAL-001', type: 'Monthly Salary', amount: 45000, paid: 45000, due: '2026-06-30', status: 'Paid', method: 'Bank Transfer' },
    { id: 'SAL-002', type: 'Monthly Salary', amount: 45000, paid: 45000, due: '2026-05-31', status: 'Paid', method: 'Bank Transfer' },
    { id: 'SAL-003', type: 'Monthly Salary', amount: 45000, paid: 45000, due: '2026-04-30', status: 'Paid', method: 'Bank Transfer' },
    { id: 'SAL-004', type: 'Monthly Salary', amount: 45000, paid: 0, due: '2026-03-31', status: 'Unpaid', method: '—' },
  ];

  const financialRecords = role === 'student' ? studentFeesReport : teacherSalaryReport;

  // Derive summary totals from the actual dataset instead of hardcoding them
  const totalBilled = financialRecords.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = financialRecords.reduce((sum, item) => sum + item.paid, 0);
  const totalPending = totalBilled - totalPaid;

  const formatCurrency = (value) => `Rs ${value.toLocaleString()}`;

  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">

      {/* Top banner */}
      <div className='bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
            {role === 'student' ? 'Student Billing' : 'Teacher Salary'}
          </span>
          <h1 className="text-2xl font-bold mt-2">Financial Records</h1>
          <p className="text-sm opacity-90 mt-1">
            {role === 'student'
              ? 'View payment history and download fee challans'
              : 'View salary history and download salary slips'}
          </p>
        </div>
        <button className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition">
          {role === 'student' ? 'Download Fee Voucher' : 'Download salary slip'}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900">{formatCurrency(totalBilled)}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Total Billed</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-emerald-600">{formatCurrency(totalPaid)}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Total Paid</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-rose-500">{formatCurrency(totalPending)}</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Pending Dues</span>
        </div>
      </div>

      {/* Table */}
      <div>
        <table className='w-full text-left'>
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-4 pl-6">{role === 'student' ? 'Fee Type' : 'Salary Type'}</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Paid</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Paid Via</th>
              <th className="p-4 pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {financialRecords.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50/60 transition'>

                <td className="p-4 pl-6 font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="text-gray-400">›</span> {item.type}
                </td>

                <td className="p-4 text-slate-700 font-medium">{formatCurrency(item.amount)}</td>

                <td className="p-4 text-slate-700 font-medium">{formatCurrency(item.paid)}</td>

                <td className="p-4 text-gray-500">{item.due}</td>

                <td>
                  {item.status.toLowerCase() === 'paid' ? (
                    <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/50">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200/50">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-4 text-gray-600">{item.method}</td>

                <td className="p-4 pr-6 text-right">
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200/60 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    {role === 'student' ? 'Challan' : 'Slip'}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Fees