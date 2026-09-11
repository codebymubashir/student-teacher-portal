import React, { useState } from 'react';
import { 
  House, 
  BookOpen, 
  CalendarDays, 
  Wallet, 
  CalendarPlus2, 
  NotebookText, 
  UserRoundPen, 
  LogOut, 
  BookAlert, 
  Users 
} from 'lucide-react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { getUser, logoutUser } from '../../../Backend/auth'; 

const Dashboard = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Get dynamic logged-in user
  const user = getUser();
  const isTeacher = user?.role === 'teacher';

  // Extract name and fallback values
  const userName = user?.name || (isTeacher ? 'Faculty Member' : 'Student');
  const userRole = user?.role || 'User';

  // Get first letter of the name for the avatar badge
  const userInitial = userName.charAt(0).toUpperCase();

  const navLinkClass = ({ isActive }) =>
    `dashmenu font-semibold p-2 mt-2 flex flex-row items-center gap-2 rounded-xl transition-colors duration-200 ${
      isActive ? 'bg-[#99b2f1] text-white' : 'text-[#6B7280] hover:bg-gray-100'
    }`;

  const handleLogoutConfirm = () => {
    logoutUser(); // Clear storage session
    setPopupOpen(false);
    navigate(isTeacher ? '/teacher/login' : '/student/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Container */}
      <aside className="w-64 h-screen fixed top-0 left-0 p-4 z-20 flex flex-col">
        <div className="w-full h-full bg-white shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Scrollable Top & Middle Section */}
          <div className="p-3 overflow-y-auto flex-1 custom-scrollbar">
            {/* Top Logo */}
            <div className="w-full p-2 flex flex-row items-center gap-2 mb-2">
              <div className="dashlogo w-10 h-10 rounded-full bg-[#526DB2] shrink-0"></div>
              <div>
                <p className="text-2xl font-bold frances">
                  Learn<span className="text-[#526DB2]">X.</span>
                </p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="w-full">
              <p className="uppercase text-xs font-bold text-[#9CA3AF] ml-2 mt-2">
                {isTeacher ? 'Teacher Menu' : 'Student Menu'}
              </p>

              {/* Common Dashboard Overview */}
              <NavLink to={'home'} end className={navLinkClass}>
                <House size={20} />
                <p className="text-md">Dashboard</p>
              </NavLink>

              {/* Dynamic Navigation */}
              {isTeacher ? (
                <>
                  <NavLink to={'content'} className={navLinkClass}>
                    <BookOpen size={20} />
                    <p className="text-md">My Courses</p>
                  </NavLink>
                  <NavLink to={'students'} className={navLinkClass}>
                    <Users size={20} />
                    <p className="text-md">Students</p>
                  </NavLink>
                  <NavLink to={'fees'} className={navLinkClass}>
                    <Wallet size={20} />
                    <p className="text-md">Fees</p>
                  </NavLink>
                  <NavLink to={'attendence'} className={navLinkClass}>
                    <CalendarDays size={20} />
                    <p className="text-md">Attendance</p>
                  </NavLink>
                  <NavLink to={'assignment'} className={navLinkClass}>
                    <NotebookText size={20} />
                    <p className="text-md">Grade Assignments</p>
                  </NavLink>
                  <NavLink to={'complaint'} className={navLinkClass}>
                    <BookAlert size={20} />
                    <p className="text-md">Complaints</p>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to={'content'} className={navLinkClass}>
                    <BookOpen size={20} />
                    <p className="text-md">Course Content</p>
                  </NavLink>
                  <NavLink to={'attendence'} className={navLinkClass}>
                    <CalendarDays size={20} />
                    <p className="text-md">Attendance</p>
                  </NavLink>
                  <NavLink to={'fees'} className={navLinkClass}>
                    <Wallet size={20} />
                    <p className="text-md">Fees</p>
                  </NavLink>
                  <NavLink to={'leaves'} className={navLinkClass}>
                    <CalendarPlus2 size={20} />
                    <p className="text-md">Leaves</p>
                  </NavLink>
                  <NavLink to={'assignment'} className={navLinkClass}>
                    <NotebookText size={20} />
                    <p className="text-md">Assignments</p>
                  </NavLink>
                  <NavLink to={'complaint'} className={navLinkClass}>
                    <BookAlert size={20} />
                    <p className="text-md">Complaints</p>
                  </NavLink>
                </>
              )}

              {/* Common Profile Link */}
              <NavLink to={'profile'} className={navLinkClass}>
                <UserRoundPen size={20} />
                <p className="text-md">Profile</p>
              </NavLink>
            </div>
          </div>

          {/* Sticky Bottom Section (Profile Card & Logout) */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="p-2.5 bg-gray-50 rounded-xl flex items-center gap-3 border border-gray-100">
              <div className="w-9 h-9 rounded-full bg-[#526DB2] text-white font-bold flex items-center justify-center text-sm shrink-0">
                {userInitial}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>

            {/* Logout Button */}
            <div
              onClick={() => setPopupOpen(true)}
              className="p-2 mt-2 dashmenu font-semibold flex flex-row items-center gap-2 text-[#6B7280] rounded-xl cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <p className="text-md">Log Out</p>
            </div>
          </div>

        </div>
      </aside>

      {/* Main Page Outlet Content Container */}
      <main className="flex-1 ml-64 p-6 min-h-screen">
        <Outlet />
      </main>

      {/* Confirmation Modal */}
      <Popup display="center" isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
        <p className="font-semibold text-lg mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setPopupOpen(false)}
            className="px-4 py-2 rounded-lg border text-[#6B7280]"
          >
            Cancel
          </button>
          <button
            onClick={handleLogoutConfirm}
            className="px-4 py-2 rounded-lg bg-[#526DB2] text-white"
          >
            Log Out
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Dashboard;