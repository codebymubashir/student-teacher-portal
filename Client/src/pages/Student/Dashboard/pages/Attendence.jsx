import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { getUser } from '../../../../Backend/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Attendance = () => {
  const user = getUser();
  const role = (user?.role || user?.userRole || 'student').toLowerCase();

  const [dateFilter, setDateFilter] = useState('');

  // ---------- STUDENT VIEW DATA (unchanged) ----------
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

  // ---------- TEACHER VIEW STATE ----------
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [markDate, setMarkDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [attendanceMarks, setAttendanceMarks] = useState({}); // { studentId: 'Present' | 'Absent' | 'Leave' }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (role === 'student') return;

    const fetchStudents = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'students'));
        const studentList = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || 'Student',
            email: data.email || '',
            batch: data.department || '—',
          };
        });
        setStudents(studentList);

        // Default every student to "Present" when the list loads
        const defaults = {};
        studentList.forEach((s) => { defaults[s.id] = 'Present'; });
        setAttendanceMarks(defaults);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        toast.error('Failed to load students');
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [role]);

  const handleMarkChange = (studentId, status) => {
    setAttendanceMarks((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAllAs = (status) => {
    const updated = {};
    students.forEach((s) => { updated[s.id] = status; });
    setAttendanceMarks(updated);
  };

  const handleSaveAttendance = async () => {
    if (!markDate) {
      toast.error('Please select a date first');
      return;
    }
    setSaving(true);
    try {
      const savePromises = students.map((s) => {
        const recordId = `${markDate}_${s.id}`;
        return setDoc(doc(db, 'attendance', recordId), {
          studentId: s.id,
          studentName: s.name,
          date: markDate,
          status: attendanceMarks[s.id] || 'Present',
          markedAt: new Date().toISOString(),
        });
      });
      await Promise.all(savePromises);
      toast.success(`Attendance saved for ${markDate}`);
    } catch (err) {
      console.error('Failed to save attendance:', err);
      toast.error('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // TEACHER VIEW
  // ============================================================
  if (role !== 'student') {
    return (
      <div className="bg-[#F4F6FA] min-h-screen p-6 font-sans text-slate-800">
        <ToastContainer position="top-center" autoClose={2000} />

        {/* Top Banner */}
        <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
              Teacher Menu
            </span>
            <h1 className="text-2xl font-bold mt-2">Mark Attendance</h1>
            <p className="text-sm opacity-90 mt-1">Mark daily attendance for all registered students</p>
          </div>
          <button
            onClick={handleSaveAttendance}
            disabled={saving || loadingStudents}
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>

        {/* Date + Quick actions */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label htmlFor="mark-date" className="text-xs font-semibold text-slate-600">Date:</label>
            <input
              id="mark-date"
              type="date"
              value={markDate}
              onChange={(e) => setMarkDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#9BB2F6] text-slate-700 bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => markAllAs('Present')} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-100 transition">
              Mark All Present
            </button>
            <button onClick={() => markAllAs('Absent')} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/60 hover:bg-rose-100 transition">
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Students list with radio buttons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loadingStudents ? (
            <div className="p-12 text-center text-sm text-gray-400">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-400">No registered students found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">Batch</th>
                    <th className="p-4 text-center">Present</th>
                    <th className="p-4 text-center">Absent</th>
                    <th className="p-4 text-center">Leave</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#9BB2F6] flex items-center justify-center font-bold text-slate-900 text-sm">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-xs text-gray-400">{student.email}</div>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-600">{student.batch}</td>

                      {['Present', 'Absent', 'Leave'].map((option) => (
                        <td key={option} className="p-4 text-center">
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            checked={attendanceMarks[student.id] === option}
                            onChange={() => handleMarkChange(student.id, option)}
                            className={`w-4 h-4 cursor-pointer ${
                              option === 'Present' ? 'accent-emerald-600' :
                              option === 'Absent' ? 'accent-rose-500' :
                              'accent-amber-500'
                            }`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // STUDENT VIEW (unchanged, your original UI)
  // ============================================================
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
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-emerald-600">29</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Present</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-rose-500">0</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Absent</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-amber-500">1</span>
          <span className="text-xs font-medium text-gray-500 mt-1">Leave</span>
        </div>
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
                  <td className="p-4 pl-6 font-medium text-slate-800">{row.date}</td>
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