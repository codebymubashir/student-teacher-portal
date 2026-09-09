import React from 'react'

const Coursecontent = () => {
    return (
        <>
            <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">

                {/* Course Banner */}

                <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
                            IT-304 • Web Development
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

                        {/* Module 3 - Active Expansion */}

                        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-[#9BB2F6]">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <h3 className="font-semibold text-base text-slate-900">Module 3: Advanced Hooks & Optimization</h3>
                                    <p className="text-xs text-gray-500">4 Lessons • In Progress</p>
                                </div>
                                <span className="bg-[#9BB2F6]/30 text-slate-900 text-xs px-2.5 py-1 rounded-full font-medium">
                                    Active Unit
                                </span>
                            </div>

                            <p className="text-xs text-slate-600 mb-4 bg-gray-50 p-2.5 rounded-lg">
                                Master performant React apps using useMemo, useCallback, and custom data-fetching hooks.
                            </p>

                            {/* Detailed Lessons */}

                            <div className="space-y-2 border-l-2 border-gray-100 pl-3">
                                <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded-lg">
                                    <span className="flex items-center gap-2">🎥 3.1 useMemo & useCallback Hooks</span>
                                    <span className="text-xs text-emerald-600 font-medium">Completed</span>
                                </div>

                                <div className="flex items-center justify-between text-sm p-2 bg-[#9BB2F6]/10 rounded-lg font-medium border border-[#9BB2F6]/30">
                                    <span className="flex items-center gap-2 text-slate-900">💻 3.2 Lab: Building Custom Fetch Hook</span>
                                    <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-semibold">
                                        Due Tomorrow
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded-lg opacity-75">
                                    <span className="flex items-center gap-2">📝 3.3 Quiz: Hook Rules & Performance</span>
                                    <span className="text-xs text-gray-400">10 Questions</span>
                                </div>

                                <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded-lg opacity-75">
                                    <span className="flex items-center gap-2">📑 3.4 Assignment: Custom Form Validation</span>
                                    <span className="text-xs text-gray-400">100 Pts</span>
                                </div>
                            </div>
                        </div>

                        {/* Module 4 - Locked */}

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-60">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-base">Module 4: Global State with Redux Toolkit</h3>
                                    <p className="text-xs text-gray-500">Locked • Unlocks next week</p>
                                </div>
                                <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">🔒 Locked</span>
                            </div>
                        </div>
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
                            <button className="w-full bg-[#9BB2F6] hover:bg-[#88a3f5] text-slate-900 text-xs font-bold py-2 rounded-lg transition">
                                Join Class
                            </button>
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
                                <button className="w-full text-left p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 font-medium flex items-center justify-between">
                                    <span>📑 Download Course Syllabus</span>
                                    <span>⬇️</span>
                                </button>
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
