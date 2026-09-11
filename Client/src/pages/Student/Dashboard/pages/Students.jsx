import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

const Students = () => {
    const [registeredStudents, setRegisteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const snapshot = await getDocs(collection(db, "students"));
                const students = snapshot.docs.map(docSnap => {
                    const data = docSnap.data();
                    return {
                        id: docSnap.id,
                        name: data.name || 'Student',
                        email: data.email || '',
                        batch: data.department || '—',
                        joinedDate: data.createdAt
                            ? new Date(data.createdAt).toLocaleDateString()
                            : '—',
                        status: 'Active'
                    };
                });
                setRegisteredStudents(students);
            } catch (err) {
                console.error("Failed to fetch students:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="bg-[#F4F6FA] min-h-screen p-6 font-sans text-slate-800">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Registered Students</h1>
                    <p className="text-sm text-gray-500">Overview of all students enrolled in the platform</p>
                </div>
                <span className="bg-[#9BB2F6]/30 text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    Total Registered: {registeredStudents.length}
                </span>
            </div>

            {/* Render Empty State if no students exist */}
            {registeredStudents.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto mt-10">
                    <div className="w-16 h-16 bg-[#9BB2F6]/20 text-slate-700 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                        🎓
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No Students Registered Yet</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        When new students register with their credentials, their profiles and enrollment details will appear here automatically.
                    </p>
                    <div className="text-xs text-slate-400 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        Waiting for student registrations...
                    </div>
                </div>
            ) : (
                /* Render Registered Students Table when list is non-empty */
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">Student</th>
                                    <th className="p-4">Student ID</th>
                                    <th className="p-4">Batch</th>
                                    <th className="p-4">Joined Date</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registeredStudents.map((student) => (
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
                                        <td className="p-4 text-xs font-medium text-slate-600">{student.id}</td>
                                        <td className="p-4 text-xs text-slate-600">{student.batch || '—'}</td>
                                        <td className="p-4 text-xs text-slate-500">{student.joinedDate}</td>
                                        <td className="p-4">
                                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
                                                {student.status || 'Active'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;