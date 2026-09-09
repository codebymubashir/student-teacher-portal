import React from 'react';
import { Phone,CreditCardCheck,User,LocateFixed,BookUser,Users,School,CalendarDays   } from 'lucide-react';

const Profile = () => {

  const userDetails = {
    name: 'Mubashir Imran',
    email: 'mubashirmugal290@gmail.com',
    status: 'Enrolled',
    avatarUrl: '/path-to-avatar.jpg', 
    phone: '03266120318',
    cnic: '31205-9546816-9',
    gender: 'Male',
    city: 'Yazman',
    address: 'Mohalla Islam Pura Ward 13 Yazman',
    guardian: 'Muhammad Imran • 03116794265',
    qualification: 'BSIT',
    joined: '—',
  };

  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">
      
      {/* Top Banner Header */}
      <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
            Student Account
          </span>
          <h1 className="text-2xl font-bold mt-2">My Profile</h1>
          <p className="text-sm opacity-90 mt-1">Manage personal details and academic credentials</p>
        </div>
        <button className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition">
          Edit Preferences
        </button>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-5">
        <div className="relative">
          <img 
            src={userDetails.avatarUrl} 
            alt={userDetails.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#9BB2F6]" 
          />
          <button 
            title="Upload new image"
            className="absolute -bottom-1 -right-1 bg-slate-900 text-white p-1.5 rounded-full border-2 border-white shadow hover:bg-slate-700 transition"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"/>
            </svg>
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">{userDetails.name}</h2>
          <p className="text-xs text-gray-500 font-medium">{userDetails.email}</p>
          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-0.5 rounded-full border border-emerald-200/60 mt-2">
            {userDetails.status}
          </span>
        </div>
      </div>

      {/* Details Grid Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-100">
          <div className="bg-[#9BB2F6]/30 p-2 rounded-lg text-slate-900">
            <User/>
          </div>
          <h3 className="text-base font-bold text-slate-900">My Details</h3>
        </div>

        {/* 2-Column Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          
          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <Phone size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.phone}</span>
            </div>
          </div>

          {/* CNIC */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <CreditCardCheck size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">CNIC</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.cnic}</span>
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <User size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Gender</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.gender}</span>
            </div>
          </div>

          {/* City */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <LocateFixed size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">City</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.city}</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <BookUser size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Address</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.address}</span>
            </div>
          </div>

          {/* Guardian */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <Users size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Guardian</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.guardian}</span>
            </div>
          </div>

          {/* Qualification */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <School size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Qualification</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.qualification}</span>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm">
                <CalendarDays size={15}/>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Joined</span>
              <span className="text-sm font-semibold text-slate-800">{userDetails.joined}</span>
            </div>
          </div>

        </div>

        {/* Footer Info Notice */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
          <span>ℹ️</span>
          <span>To correct any of these details, please contact the front desk.</span>
        </div>

      </div>

    </div>
  );
};

export default Profile;