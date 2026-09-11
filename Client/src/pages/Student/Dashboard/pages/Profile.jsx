import React, { useState, useEffect } from 'react';
import { Phone, CreditCardCheck, User, LocateFixed, BookUser, Users, School, CalendarDays, Briefcase, X } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { getUser, setUserSession } from '../../../../Backend/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const user = getUser();
  const role = (user?.role || user?.userRole || 'student').toLowerCase();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const currentUser = getUser(); // always read fresh from localStorage
      const currentRole = (currentUser?.role || currentUser?.userRole || 'student').toLowerCase();

      if (currentRole === 'student' && currentUser?.uid) {
        const snap = await getDoc(doc(db, 'students', currentUser.uid));
        const data = snap.exists() ? snap.data() : {};
        setDetails({
          name: data.name || currentUser?.name || 'Student',
          email: data.email || currentUser?.email || '',
          status: 'Enrolled',
          phone: data.phone || '—',
          cnic: data.cnic || '—',
          gender: data.gender || '—',
          city: data.city || '—',
          address: data.address || '—',
          guardian: data.guardian || '—',
          department: data.department || '—',
          joined: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '—',
        });
      } else {
        setDetails({
          name: currentUser?.name || 'Teacher',
          email: currentUser?.email || '',
          status: 'Active',
          phone: currentUser?.phone || '—',
          cnic: currentUser?.cnic || '—',
          gender: currentUser?.gender || '—',
          city: currentUser?.city || '—',
          address: currentUser?.address || '—',
          subject: currentUser?.subject || '—',
          qualification: currentUser?.qualification || '—',
          employeeId: currentUser?.employeeId || '—',
          joined: currentUser?.joined || '—',
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const openForm = () => {
    // Pre-fill the form with current values, turning '—' back into empty strings for editing
    const clean = {};
    Object.entries(details).forEach(([key, value]) => {
      clean[key] = value === '—' ? '' : value;
    });
    setFormData(clean);
    setShowForm(true);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const currentUser = getUser(); // always read fresh, don't trust the outer `user`
      const currentRole = (currentUser?.role || currentUser?.userRole || 'student').toLowerCase();

      if (currentRole === 'student' && currentUser?.uid) {
        // Save to Firestore, merge so we don't wipe fields not in this form (like createdAt)
        await setDoc(doc(db, 'students', currentUser.uid), {
          phone: formData.phone,
          cnic: formData.cnic,
          gender: formData.gender,
          city: formData.city,
          address: formData.address,
          guardian: formData.guardian,
        }, { merge: true });
      } else {
        // Teacher: no Firestore doc, so persist into the local session
        setUserSession({
          ...currentUser,
          phone: formData.phone,
          cnic: formData.cnic,
          gender: formData.gender,
          city: formData.city,
          address: formData.address,
          subject: formData.subject,
          qualification: formData.qualification,
          employeeId: formData.employeeId,
        });
      }
      toast.success('Profile updated');
      setShowForm(false);
      await fetchDetails();
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !details) {
    return (
      <div className="bg-[#F4F6FA] min-h-screen p-6 font-sans text-slate-800 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading profile...</p>
      </div>
    );
  }

  const initial = details.name.charAt(0).toUpperCase();

  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Top Banner Header */}
      <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
            {role === 'student' ? 'Student Account' : 'Teacher Account'}
          </span>
          <h1 className="text-2xl font-bold mt-2">My Profile</h1>
          <p className="text-sm opacity-90 mt-1">Manage personal details and academic credentials</p>
        </div>
        <button
          onClick={() => (showForm ? setShowForm(false) : openForm())}
          className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition flex items-center gap-1.5"
        >
          {showForm ? <X size={14} /> : null}
          {showForm ? 'Cancel' : 'Edit Preferences'}
        </button>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-[#9BB2F6] flex items-center justify-center text-2xl font-bold text-slate-900 border-2 border-[#9BB2F6]">
          {initial}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{details.name}</h2>
          <p className="text-xs text-gray-500 font-medium">{details.email}</p>
          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-0.5 rounded-full border border-emerald-200/60 mt-2">
            {details.status}
          </span>
        </div>
      </div>

      {/* Edit Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">Edit My Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
              <input
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="03xx-xxxxxxx"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">CNIC</label>
              <input
                value={formData.cnic || ''}
                onChange={(e) => handleChange('cnic', e.target.value)}
                placeholder="xxxxx-xxxxxxx-x"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
              <select
                value={formData.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6] bg-white"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
              <input
                value={formData.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
              <input
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
              />
            </div>

            {role === 'student' ? (
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Guardian (Name • Phone)</label>
                <input
                  value={formData.guardian || ''}
                  onChange={(e) => handleChange('guardian', e.target.value)}
                  placeholder="e.g. Muhammad Imran • 03xx-xxxxxxx"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
                  <input
                    value={formData.subject || ''}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Qualification</label>
                  <input
                    value={formData.qualification || ''}
                    onChange={(e) => handleChange('qualification', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Employee ID</label>
                  <input
                    value={formData.employeeId || ''}
                    onChange={(e) => handleChange('employeeId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {/* Details Grid Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-100">
          <div className="bg-[#9BB2F6]/30 p-2 rounded-lg text-slate-900">
            <User />
          </div>
          <h3 className="text-base font-bold text-slate-900">My Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><Phone size={15} /></div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone</span>
              <span className="text-sm font-semibold text-slate-800">{details.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><CreditCardCheck size={15} /></div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">CNIC</span>
              <span className="text-sm font-semibold text-slate-800">{details.cnic}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><User size={15} /></div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Gender</span>
              <span className="text-sm font-semibold text-slate-800">{details.gender}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><LocateFixed size={15} /></div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">City</span>
              <span className="text-sm font-semibold text-slate-800">{details.city}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><BookUser size={15} /></div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Address</span>
              <span className="text-sm font-semibold text-slate-800">{details.address}</span>
            </div>
          </div>

          {role === 'student' ? (
            <>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><Users size={15} /></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Guardian</span>
                  <span className="text-sm font-semibold text-slate-800">{details.guardian}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><School size={15} /></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Department</span>
                  <span className="text-sm font-semibold text-slate-800">{details.department}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><School size={15} /></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Subject</span>
                  <span className="text-sm font-semibold text-slate-800">{details.subject}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><Briefcase size={15} /></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Qualification</span>
                  <span className="text-sm font-semibold text-slate-800">{details.qualification}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><CreditCardCheck size={15} /></div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Employee ID</span>
                  <span className="text-sm font-semibold text-slate-800">{details.employeeId}</span>
                </div>
              </div>
            </>
          )}

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 text-sm"><CalendarDays size={15} /></div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Joined</span>
              <span className="text-sm font-semibold text-slate-800">{details.joined}</span>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
          <span>ℹ️</span>
          <span>To correct any of these details, please contact the front desk.</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;