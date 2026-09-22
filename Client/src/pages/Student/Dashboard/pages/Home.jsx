import React, { useState, useEffect } from 'react'
import { School, CalendarDays, Gift, Phone, MailPlus, Users, ListChecks, ClipboardCheck, Award } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import UpcomingAssignments from '../../../../components/Upcomingassignments';
import Subjectgraph from '../../../../components/Subjectgraph';
import { getUser } from '../../../../Backend/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

const Home = () => {

    const user = getUser();
    const userName = user?.name || "Student";
    const usermail = user?.email || "Student";
    const role = (user?.role || user?.userRole || 'student').toLowerCase();

    // Dynamic stats state
    const [stats, setStats] = useState({
        attendance: 0,
        tasksCompleted: 0,
        tasksInProgress: 0,
        rewardPoints: 0,
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (!user?.uid) return;

                const collectionName = role === 'teacher' ? 'teachers' : 'students';
                const docRef = doc(db, collectionName, user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    if (role === 'teacher') {
                        setStats({
                            attendance: data.classAttendance ?? 0,        // avg attendance across teacher's classes
                            tasksCompleted: data.assignmentsGraded ?? 0,  // assignments graded so far
                            tasksInProgress: data.pendingGrading ?? 0,    // assignments still to grade
                            rewardPoints: data.studentsManaged ?? 0,      // total students under this teacher
                        })
                    } else {
                        setStats({
                            attendance: data.attendance ?? 0,
                            tasksCompleted: data.tasksCompleted ?? 0,
                            tasksInProgress: data.tasksInProgress ?? 0,
                            rewardPoints: data.rewardPoints ?? 0,
                        })
                    }
                }
            } catch (error) {
                console.log("Error fetching stats:", error)
            }
        }

        fetchStats()
    }, [user?.uid, role])

    // Labels swap for teacher vs student
    const statLabels = role === 'teacher'
        ? ['Class Attendance', 'Assignments Graded', 'Pending Grading', 'Students Managed']
        : ['Attendance', 'Task Completed', 'Task in Progress', 'Reward Points']

    const gpa = 3.4
    const maxGpa = 4.0
    const semesterRange = '1st Semester - 6th Semester'

    const performanceData = [
        { name: 'Achieved', value: gpa },
        { name: 'Remaining', value: maxGpa - gpa },
    ]

    const PERFORMANCE_COLORS = ['#C7D2FE', '#FDE68A']

    return (
        <>
            <div className='student w-full h-[140vh] relative bg-[#F5F6FA]'>
                <div className='w-[80%] h-50 rounded-2xl ml-6 bg-[#99b2f1] p-4 mt-4 flex flex-row'>

                    <div className='homedp w-38 h-38 mt-2 ml-5 rounded-full  bg-white'></div>
                    <div className='w-[80%] h-full  pl-8'>
                        <h2 className='text-4xl font-semibold monospace mt-2'>Welcome, {userName}</h2>
                        <p>
                            {role === 'student'
                                ? 'Track your daily attendance, manage tasks, and monitor your academic progress.'
                                : 'Manage class attendance, review student submissions, and grade upcoming assignments.'}
                        </p>
                        <div className='grid grid-cols-2 mt-6 ml-2'>
                            <div className='flex items-center gap-2'>
                                <School className='font-extrabold' size={15} />
                                <p>Information Technology</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MailPlus className='font-extrabold' size={15} />
                                <p>{usermail}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CalendarDays className='font-extrabold' size={15} />
                                <p>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Phone className='font-extrabold' size={15} />
                                <p>0304-3645491</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* student data + performance side by side */}

                <div className='flex flex-row gap-4 ml-6 mt-4 items-start'>

                    {/* dynamic stats  */}

                    <div className='w-[45%] grid grid-cols-2 gap-4'>

                        <div className='bg-white rounded-2xl shadow-sm p-4'>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='bg-[#DBEAFE] p-2.5 rounded-xl'>
                                    <Users size={20} className='text-blue-500' />
                                </div>
                                <div>
                                    <p className='text-black text-xl font-bold leading-none'>{stats.attendance}%</p>
                                    <p className='text-gray-400 text-sm mt-1'>{statLabels[0]}</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl shadow-sm p-4'>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='bg-[#E0E7FF] p-2.5 rounded-xl'>
                                    <ListChecks size={20} className='text-indigo-500' />
                                </div>
                                <div>
                                    <p className='text-black text-xl font-bold leading-none'>{stats.tasksCompleted}{role === 'student' ? '+' : ''}</p>
                                    <p className='text-gray-400 text-sm mt-1'>{statLabels[1]}</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl shadow-sm p-4'>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='bg-[#FEF3C7] p-2.5 rounded-xl'>
                                    <ClipboardCheck size={20} className='text-amber-500' />
                                </div>
                                <div>
                                    <p className='text-black text-xl font-bold leading-none'>{stats.tasksInProgress}{role === 'student' ? '%' : ''}</p>
                                    <p className='text-gray-400 text-sm mt-1'>{statLabels[2]}</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl shadow-sm p-4'>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='bg-[#FCE7F3] p-2.5 rounded-xl'>
                                    <Award size={20} className='text-pink-500' />
                                </div>
                                <div>
                                    <p className='text-black text-xl font-bold leading-none'>{stats.rewardPoints}</p>
                                    <p className='text-gray-400 text-sm mt-1'>{statLabels[3]}</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Performance gauge card */}


                    <div className='bg-white rounded-2xl shadow-sm p-5 w-120'>

                        <div className='flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-gray-900'>Performance</h2>
                            <MoreHorizontal size={20} className='text-gray-400' />
                        </div>

                        <div className='flex justify-center relative'>
                            <PieChart width={260} height={150}>
                                <Pie
                                    data={performanceData}
                                    cx={130}
                                    cy={140}
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={70}
                                    outerRadius={100}
                                    dataKey='value'
                                    stroke='none'
                                >
                                    {performanceData.map((entry, index) => (
                                        <Cell key={index} fill={PERFORMANCE_COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>

                            <div className='absolute bottom-2 flex flex-col items-center'>
                                <p className='text-3xl font-bold text-gray-900'>{gpa}</p>
                                <p className='text-xs text-gray-400'>of {maxGpa} max GPA</p>
                            </div>
                        </div>

                        <p className='text-center text-sm font-semibold text-gray-700 mt-2'>
                            {semesterRange}
                        </p>
                    </div>

                </div>


                {/* upcoming assignments */}

                <div className='flex flex-row gap-4 ml-6 items-start relative bottom-15 '>
                    <UpcomingAssignments />
                </div>

                {/* graph of the subject */}

                <div className='w-120 absolute top-120 left-120'>
                    <Subjectgraph />
                </div>

                {/* refaral and reward */}

                <div className='w-110 bg-blue-50 border-1 rounded-2xl ml-6 border-blue-600 px-5 py-3 absolute bottom-14'>
                    <div className='flex items-center gap-2 mb-1'>
                        <Gift size={18} className='text-blue-600' />
                        <h3 className='text-sm font-bold text-blue-600'>Rewards & referrals</h3>
                    </div>
                    <p className='text-sm text-blue-500/80 leading-relaxed pl-6'>
                        Refer a friend who enrols and earn rewards toward your fee. Once your referrals cover your full course fee you become a Brand Ambassador, and future referrals pay out as cash.
                    </p>
                </div>

            </div>
        </>
    )
}

export default Home