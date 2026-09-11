import React, { useState } from 'react'
import { getUser } from '../../../../Backend/auth'

const Coursecontent = () => {

    const user = getUser();
    const role = (user?.role || user?.userRole || 'student').toLowerCase();

    // Module 3 State
    const [module3Lessons, setModule3Lessons] = useState([
        { id: "3.1", title: "🎥 3.1 useMemo & useCallback Hooks", isCompleted: true },
        { id: "3.2", title: "💻 3.2 Lab: Building Custom Fetch Hook", isCompleted: false, badge: "Due Tomorrow" },
        { id: "3.3", title: "📝 3.3 Quiz: Hook Rules & Performance", isCompleted: false, extraText: "10 Questions" },
        { id: "3.4", title: "📑 3.4 Assignment: Custom Form Validation", isCompleted: false, extraText: "100 Pts" }
    ]);

    // Module 4 State
    const [module4Lessons, setModule4Lessons] = useState([
        { id: "4.1", title: "🎥 4.1 Intro to Redux Toolkit & Store", isCompleted: false },
        { id: "4.2", title: "💻 4.2 Lab: Creating Redux Slices", isCompleted: false, badge: "Upcoming" },
        { id: "4.3", title: "📝 4.3 Quiz: Redux Data Flow", isCompleted: false, extraText: "5 Questions" }
    ]);

    // Module 5 State
    const [module5Lessons, setModule5Lessons] = useState([
        { id: "5.1", title: "🎥 5.1 Async Logic with Redux Thunk", isCompleted: false },
        { id: "5.2", title: "📑 5.2 Assignment: Full Stack State Integration", isCompleted: false, extraText: "150 Pts" }
    ]);

    // Module 6 State
    const [module6Lessons, setModule6Lessons] = useState([
        { id: "6.1", title: "🎥 6.1 Capstone Project Setup & Architecture", isCompleted: false },
        { id: "6.2", title: "💻 6.2 Final Capstone Submission", isCompleted: false, extraText: "Final Exam" }
    ]);

    // Toggle Handlers
    const toggleLesson = (setLessons, id) => {
        setLessons(prev =>
            prev.map(lesson =>
                lesson.id === id ? { ...lesson, isCompleted: !lesson.isCompleted } : lesson
            )
        );
    };

    // Derived Completion Checks
    const isModule3Complete = module3Lessons.every(l => l.isCompleted);
    const isModule4Complete = isModule3Complete && module4Lessons.every(l => l.isCompleted);
    const isModule5Complete = isModule4Complete && module5Lessons.every(l => l.isCompleted);
    const isModule6Complete = isModule5Complete && module6Lessons.every(l => l.isCompleted);

    // Unlocking Logic Flags
    const isModule4Unlocked = isModule3Complete;
    const isModule5Unlocked = isModule4Complete;
    const isModule6Unlocked = isModule5Complete;

    // Render helper for interactive lesson items
    const renderLessons = (lessons, setLessons) => (
        <div className="space-y-2 border-l-2 border-gray-100 pl-3">
            {lessons.map((lesson) => (
                <div 
                    key={lesson.id}
                    onClick={() => toggleLesson(setLessons, lesson.id)}
                    className={`flex items-center justify-between text-sm p-2 rounded-lg cursor-pointer transition-colors ${
                        lesson.isCompleted 
                            ? 'bg-emerald-50/50 hover:bg-emerald-50' 
                            : 'hover:bg-gray-50'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <input 
                            type="checkbox"
                            checked={lesson.isCompleted}
                            onChange={() => {}} 
                            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <span className={`${lesson.isCompleted ? 'line-through text-gray-400' : 'text-slate-900 font-medium'}`}>
                            {lesson.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {lesson.isCompleted ? (
                            <span className="text-xs text-emerald-600 font-medium">Completed</span>
                        ) : (
                            <>
                                {lesson.badge && (
                                    <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                                        {lesson.badge}
                                    </span>
                                )}
                                {lesson.extraText && (
                                    <span className="text-xs text-gray-400">{lesson.extraText}</span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">

                {/* Course Banner */}
                <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
                            {role === 'student'
                                ? 'IT-304 • Web Development'
                                : 'Batch-304 • Web Development '}
                        </span>
                        <h1 className="text-2xl font-bold mt-2">React.js & Modern Frontend Development</h1>
                        <p className="text-sm opacity-90 mt-1">6 Modules • 24 Lessons • 2 Live Labs</p>
                    </div>

                    {/* Progress Widget */}
                    <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl border border-white/40 min-w-[220px]">
                        <div className="flex justify-between text-sm font-semibold mb-1">
                            <span>Progress</span>
                            <span>65%</span>
                        </div>
                        <div className="bg-white/50 rounded-full h-2.5 w-full overflow-hidden">
                            <div className="bg-slate-900 h-full w-[65%] rounded-full"></div>
                        </div>
                        <span className="text-xs opacity-80 mt-2 block">16 of 24 Lessons Done</span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Curriculum Accordion */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900">Course Curriculum</h2>
                            <span className="text-xs text-gray-500">Expand All</span>
                        </div>

                        {/* Module 1 - Completed */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-base">Module 1: React Fundamentals & JSX</h3>
                                    <p className="text-xs text-gray-500">4 Lessons • 1 Quiz</p>
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
                                    Completed
                                </span>
                            </div>
                        </div>

                        {/* Module 2 - Completed */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-base">Module 2: State & Component Lifecycle</h3>
                                    <p className="text-xs text-gray-500">5 Lessons • 1 Lab</p>
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
                                    Completed
                                </span>
                            </div>
                        </div>

                        {/* Module 3 */}
                        <div className={`bg-white rounded-xl p-5 shadow-sm border-2 transition-all ${
                            isModule3Complete ? 'border-emerald-400' : 'border-[#9BB2F6]'
                        }`}>
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="font-semibold text-base text-slate-900">Module 3: Advanced Hooks & Optimization</h3>
                                    <p className="text-xs text-gray-500">
                                        {module3Lessons.filter(l => l.isCompleted).length} of {module3Lessons.length} Lessons Completed
                                    </p>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                    isModule3Complete ? 'bg-emerald-100 text-emerald-700' : 'bg-[#9BB2F6]/30 text-slate-900'
                                }`}>
                                    {isModule3Complete ? 'Completed' : 'Active Unit'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 mb-4 bg-gray-50 p-2.5 rounded-lg">
                                Master performant React apps using useMemo, useCallback, and custom data-fetching hooks.
                            </p>
                            {renderLessons(module3Lessons, setModule3Lessons)}
                        </div>

                        {/* Module 4 - Unlocks when Module 3 is completed */}
                        {isModule4Unlocked ? (
                            <div className={`bg-white rounded-xl p-5 shadow-sm border-2 transition-all ${
                                isModule4Complete ? 'border-emerald-400' : 'border-[#9BB2F6]'
                            }`}>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="font-semibold text-base text-slate-900">Module 4: Global State with Redux Toolkit</h3>
                                        <p className="text-xs text-gray-500">
                                            {module4Lessons.filter(l => l.isCompleted).length} of {module4Lessons.length} Lessons Completed
                                        </p>
                                    </div>
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                        isModule4Complete ? 'bg-emerald-100 text-emerald-700' : 'bg-[#9BB2F6]/30 text-slate-900'
                                    }`}>
                                        {isModule4Complete ? 'Completed' : 'Active Unit'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 mb-4 bg-gray-50 p-2.5 rounded-lg">
                                    Learn scalable centralized state management using Redux Toolkit slices and selectors.
                                </p>
                                {renderLessons(module4Lessons, setModule4Lessons)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-60">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-base">Module 4: Global State with Redux Toolkit</h3>
                                        <p className="text-xs text-gray-500">Locked • Complete Module 3 to unlock</p>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">🔒 Locked</span>
                                </div>
                            </div>
                        )}

                        {/* Module 5 - Unlocks when Module 4 is completed */}
                        {isModule5Unlocked ? (
                            <div className={`bg-white rounded-xl p-5 shadow-sm border-2 transition-all ${
                                isModule5Complete ? 'border-emerald-400' : 'border-[#9BB2F6]'
                            }`}>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="font-semibold text-base text-slate-900">Module 5: Advanced Async Redux & Middleware</h3>
                                        <p className="text-xs text-gray-500">
                                            {module5Lessons.filter(l => l.isCompleted).length} of {module5Lessons.length} Lessons Completed
                                        </p>
                                    </div>
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                        isModule5Complete ? 'bg-emerald-100 text-emerald-700' : 'bg-[#9BB2F6]/30 text-slate-900'
                                    }`}>
                                        {isModule5Complete ? 'Completed' : 'Active Unit'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 mb-4 bg-gray-50 p-2.5 rounded-lg">
                                    Handle API integrations, side effects, and custom middleware with createAsyncThunk.
                                </p>
                                {renderLessons(module5Lessons, setModule5Lessons)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-60">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-base">Module 5: Advanced Async Redux & Middleware</h3>
                                        <p className="text-xs text-gray-500">Locked • Complete Module 4 to unlock</p>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">🔒 Locked</span>
                                </div>
                            </div>
                        )}

                        {/* Module 6 - Unlocks when Module 5 is completed */}
                        {isModule6Unlocked ? (
                            <div className={`bg-white rounded-xl p-5 shadow-sm border-2 transition-all ${
                                isModule6Complete ? 'border-emerald-400' : 'border-[#9BB2F6]'
                            }`}>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="font-semibold text-base text-slate-900">Module 6: Capstone Project & Deployment</h3>
                                        <p className="text-xs text-gray-500">
                                            {module6Lessons.filter(l => l.isCompleted).length} of {module6Lessons.length} Lessons Completed
                                        </p>
                                    </div>
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                        isModule6Complete ? 'bg-emerald-100 text-emerald-700' : 'bg-[#9BB2F6]/30 text-slate-900'
                                    }`}>
                                        {isModule6Complete ? 'Completed' : 'Active Unit'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 mb-4 bg-gray-50 p-2.5 rounded-lg">
                                    Build, optimize, and deploy your production-ready enterprise React capstone project.
                                </p>
                                {renderLessons(module6Lessons, setModule6Lessons)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-60">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-base">Module 6: Capstone Project & Deployment</h3>
                                        <p className="text-xs text-gray-500">Locked • Complete Module 5 to unlock</p>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">🔒 Locked</span>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Widgets */}
                    <div className="space-y-5">

                        {/* Live Session Alert */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-slate-900 mb-2">🎥 Upcoming Live Q&A</h3>
                            <p className="text-xs text-gray-600 mb-3">Topic: Debugging Custom Hooks & Context API</p>
                            <div className="text-xs font-semibold text-blue-600 bg-blue-50 p-2 rounded-md mb-3">
                                Thursday, 4:00 PM • Google Meet
                            </div>
                            <a
                                href="https://meet.google.com/new"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full bg-[#9BB2F6] hover:bg-[#88a3f5] text-slate-900 text-xs font-bold py-2 rounded-lg transition">
                                    Join Class
                                </button>
                            </a>
                        </div>

                        {/* Active Tasks / Submissions */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-slate-900 mb-3">Pending Tasks</h3>
                            <div className="space-y-2">
                                <div className="p-2.5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                    <h4 className="text-xs font-bold text-red-800">Custom Fetch Hook Lab</h4>
                                    <p className="text-[11px] text-red-600">Due: Aug 24, 11:59 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Downloads & Links */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-slate-900 mb-3">Course Resources</h3>
                            <div className="space-y-2 text-xs">
                                <a
                                    href="/assignment.pdf"
                                    download="Assignment-File.pdf"
                                >
                                    <button className="w-full text-left p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 font-medium flex items-center justify-between">
                                        <span>📑 Download Course Syllabus</span>
                                        <span>⬇️</span>
                                    </button>
                                </a>
                                <button className="w-full text-left p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 font-medium flex items-center justify-between">
                                    <span>📦 GitHub Starter Code</span>
                                    <span>🔗</span>
                                </button>
                                <button className="w-full text-left p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 font-medium flex items-center justify-between">
                                    <span>💬 Class Discussion Forum</span>
                                    <span>💬</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Coursecontent