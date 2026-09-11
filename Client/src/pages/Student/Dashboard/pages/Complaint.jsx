import React, { useState, useEffect } from 'react';
import { BookAlert, X } from 'lucide-react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { getUser } from '../../../../Backend/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Complaint = () => {
  const user = getUser();
  const role = (user?.role || user?.userRole || 'student').toLowerCase();
  const userId = user?.uid || user?.email;

  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'complaints'));
      const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Only show this person's own complaints
      const mine = all
        .filter((c) => c.submittedBy === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComplaints(mine);
    } catch (err) {
      console.error('Failed to load complaints:', err);
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubject('');
    setCategory('General');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !description) {
      toast.error('Please fill in subject and description');
      return;
    }
    setSaving(true);
    try {
      const id = `complaint_${Date.now()}`;
      await setDoc(doc(db, 'complaints', id), {
        subject,
        category,
        description,
        submittedBy: userId,
        submittedByName: user?.name || (role === 'teacher' ? 'Teacher' : 'Student'),
        role,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      });
      toast.success('Complaint submitted');
      resetForm();
      setShowForm(false);
      fetchComplaints();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit complaint');
    } finally {
      setSaving(false);
    }
  };

  const statusStyle = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'in progress':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200/60';
    }
  };

  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Top Banner */}
      <div className='bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className="text-2xl font-bold mt-2">Complaints</h1>
          <p className="text-sm opacity-90 mt-1">View your leave history and download the applications</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition flex items-center gap-1.5"
        >
          {showForm ? <X size={14} /> : null}
          {showForm ? 'Cancel' : 'New Complaint'}
        </button>
      </div>

      {/* Complaint Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief title for your complaint"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6] bg-white"
              >
                <option>General</option>
                <option>Academic</option>
                <option>Facilities</option>
                <option>Fees / Billing</option>
                <option>Behavior / Conduct</option>
                <option>Technical Issue</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe your complaint in detail..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition disabled:opacity-50"
          >
            {saving ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      )}

      {/* Complaint history */}
      <div className='bg-white rounded-2xl p-4 text-slate-900 mb-6 shadow-sm'>
        {loading ? (
          <div className="text-center text-sm text-gray-400 p-16">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className='w-full border rounded-2xl border-dashed flex justify-center'>
            <div className='text-[#ccd6e2] flex flex-col items-center p-20'>
              <BookAlert size={40} />
              <p className="mt-2">You have not submitted any complaints yet</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {complaints.map((c) => (
              <div key={c.id} className="py-4 flex flex-col md:flex-row justify-between md:items-start gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 text-sm">{c.subject}</h3>
                    <span className="text-xs text-slate-500 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 max-w-xl">{c.description}</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Submitted {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border h-fit ${statusStyle(c.status)}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaint;