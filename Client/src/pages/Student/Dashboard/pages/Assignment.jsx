import React, { useState, useEffect } from 'react';
import { FileText, Plus, X, Download, Check } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { getUser } from '../../../../Backend/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Assignment = () => {
  const user = getUser();
  const role = (user?.role || user?.userRole || 'student').toLowerCase();

  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]); // all submissions, filtered per assignment when needed
  const [loading, setLoading] = useState(true);

  // Teacher: create-assignment form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newBatch, setNewBatch] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Teacher: which assignment's submissions are expanded
  const [expandedId, setExpandedId] = useState(null);

  // Student: submission link input, keyed by assignment id
  const [submitLinks, setSubmitLinks] = useState({});

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [assignSnap, studentSnap, subSnap] = await Promise.all([
        getDocs(collection(db, 'assignments')),
        getDocs(collection(db, 'students')),
        getDocs(collection(db, 'submissions')),
      ]);

      setAssignments(
        assignSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      setStudents(
        studentSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      setSubmissions(
        subSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    } catch (err) {
      console.error('Failed to load assignments:', err);
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  // ---------- TEACHER: create assignment ----------
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) {
      toast.error('Title and due date are required');
      return;
    }
    setSaving(true);
    try {
      const id = `assign_${Date.now()}`;
      await setDoc(doc(db, 'assignments', id), {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        batch: newBatch || 'All',
        fileUrl: newFileUrl || '',
        createdAt: new Date().toISOString(),
        createdBy: user?.name || 'Teacher',
      });
      toast.success('Assignment created');
      setNewTitle(''); setNewDescription(''); setNewDueDate(''); setNewBatch(''); setNewFileUrl('');
      setShowCreateForm(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create assignment');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await deleteDoc(doc(db, 'assignments', assignmentId));
      toast.success('Assignment deleted');
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete assignment');
    }
  };

  // ---------- STUDENT: submit assignment ----------
  const handleSubmit = async (assignmentId) => {
    const link = submitLinks[assignmentId];
    if (!link) {
      toast.error('Please add a link or file URL before submitting');
      return;
    }
    try {
      const subId = `${assignmentId}_${user?.uid || user?.email}`;
      await setDoc(doc(db, 'submissions', subId), {
        assignmentId,
        studentId: user?.uid || user?.email,
        studentName: user?.name || 'Student',
        fileUrl: link,
        submittedAt: new Date().toISOString(),
      });
      toast.success('Assignment submitted');
      setSubmitLinks((prev) => ({ ...prev, [assignmentId]: '' }));
      fetchAll();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit assignment');
    }
  };

  const getSubmissionsFor = (assignmentId) =>
    submissions.filter((s) => s.assignmentId === assignmentId);

  const getMySubmission = (assignmentId) =>
    submissions.find(
      (s) => s.assignmentId === assignmentId && s.studentId === (user?.uid || user?.email)
    );

  const isPastDue = (dueDate) => new Date(dueDate) < new Date();

  // ============================================================
  // TEACHER VIEW
  // ============================================================
  if (role !== 'student') {
    return (
      <div className="bg-[#F4F6FA] min-h-screen p-6 font-sans text-slate-800">
        <ToastContainer position="top-center" autoClose={2000} />

        <div className="bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
              Teacher Menu
            </span>
            <h1 className="text-2xl font-bold mt-2">Assignments</h1>
            <p className="text-sm opacity-90 mt-1">Create assignments and track student submissions.</p>
          </div>
          <button
            onClick={() => setShowCreateForm((v) => !v)}
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            {showCreateForm ? <X size={14} /> : <Plus size={14} />}
            {showCreateForm ? 'Cancel' : 'Create Assignment'}
          </button>
        </div>

        {/* Create form */}
        {showCreateForm && (
          <form onSubmit={handleCreateAssignment} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Batch / Department</label>
                <input value={newBatch} onChange={(e) => setNewBatch(e.target.value)} placeholder="e.g. CS, IT, All"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
                <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Attachment Link (quiz statement)</label>
                <input value={newFileUrl} onChange={(e) => setNewFileUrl(e.target.value)} placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description / Instructions</label>
              <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#9BB2F6]" />
            </div>
            <button type="submit" disabled={saving}
              className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow hover:bg-slate-800 transition disabled:opacity-50">
              {saving ? 'Creating...' : 'Post Assignment'}
            </button>
          </form>
        )}

        {/* Assignment list */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-sm text-gray-400">Loading assignments...</div>
          ) : assignments.length === 0 ? (
            <div className="p-16 text-center">
              <FileText size={40} className="mx-auto text-[#ccd6e2] mb-3" />
              <p className="text-gray-400">No assignments created yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {assignments.map((a) => {
                const subs = getSubmissionsFor(a.id);
                const submittedIds = new Set(subs.map((s) => s.studentId));
                const relevantStudents = a.batch === 'All'
                  ? students
                  : students.filter((s) => (s.department || '').toLowerCase() === a.batch.toLowerCase());
                const notSubmitted = relevantStudents.filter((s) => !submittedIds.has(s.id));
                const isExpanded = expandedId === a.id;

                return (
                  <div key={a.id} className="p-5">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900">{a.title}</h3>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                            isPastDue(a.dueDate)
                              ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                          }`}>
                            {isPastDue(a.dueDate) ? 'Closed' : 'Open'}
                          </span>
                          <span className="text-xs text-slate-500 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-200">
                            {a.batch}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{a.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Due: {a.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-600">
                          {subs.length} / {relevantStudents.length} submitted
                        </span>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : a.id)}
                          className="text-xs font-semibold text-[#526db2] hover:underline"
                        >
                          {isExpanded ? 'Hide' : 'View'}
                        </button>
                        <button
                          onClick={() => handleDeleteAssignment(a.id)}
                          className="text-xs font-semibold text-rose-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                            Submitted ({subs.length})
                          </h4>
                          <div className="space-y-2">
                            {subs.length === 0 && <p className="text-xs text-gray-400">No submissions yet</p>}
                            {subs.map((s) => (
                              <div key={s.id} className="flex items-center justify-between bg-emerald-50/50 border border-emerald-200/50 rounded-lg px-3 py-2">
                                <div>
                                  <p className="text-xs font-semibold text-slate-800">{s.studentName}</p>
                                  <p className="text-[10px] text-gray-500">{new Date(s.submittedAt).toLocaleString()}</p>
                                </div>
                                {s.fileUrl && (
                                  <a href={s.fileUrl} target="_blank" rel="noreferrer"
                                    className="text-emerald-700 hover:text-emerald-900">
                                    <Download size={14} />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">
                            Not Submitted ({notSubmitted.length})
                          </h4>
                          <div className="space-y-2">
                            {notSubmitted.length === 0 && <p className="text-xs text-gray-400">Everyone has submitted</p>}
                            {notSubmitted.map((s) => (
                              <div key={s.id} className="bg-rose-50/50 border border-rose-200/50 rounded-lg px-3 py-2">
                                <p className="text-xs font-semibold text-slate-800">{s.name}</p>
                                <p className="text-[10px] text-gray-500">{s.email}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // STUDENT VIEW
  // ============================================================
  const myBatch = (user?.department || '').toLowerCase();
  const myAssignments = assignments.filter(
    (a) => a.batch === 'All' || a.batch.toLowerCase() === myBatch
  );

  return (
    <div className="bg-[#F4F6FA] student min-h-screen p-6 font-sans text-slate-800">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className='bg-[#9BB2F6] rounded-2xl p-6 text-slate-900 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/40 px-2.5 py-1 rounded-md">
            Student Assignments
          </span>
          <h1 className="text-2xl font-bold mt-2">Assignments</h1>
          <p className="text-sm opacity-90 mt-1">View your assignments here and download the quiz statements.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-sm text-gray-400 shadow-sm border border-gray-100">
            Loading assignments...
          </div>
        ) : myAssignments.length === 0 ? (
          <div className='bg-white rounded-2xl p-4 shadow-sm'>
            <div className='w-full border rounded-2xl border-dashed flex justify-center'>
              <div className='text-[#ccd6e2] flex flex-col items-center p-20'>
                <FileText size={40} />
                <p className="mt-2">No Assignment yet</p>
              </div>
            </div>
          </div>
        ) : (
          myAssignments.map((a) => {
            const mySub = getMySubmission(a.id);
            const closed = isPastDue(a.dueDate);
            return (
              <div key={a.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900">{a.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        closed ? 'bg-rose-50 text-rose-700 border-rose-200/60' : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                      }`}>
                        {closed ? 'Closed' : 'Open'}
                      </span>
                      {mySub && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                          <Check size={12} /> Submitted
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{a.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Due: {a.dueDate}</p>
                    {a.fileUrl && (
                      <a href={a.fileUrl} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#526db2] hover:underline mt-1">
                        <Download size={12} /> Quiz Statement
                      </a>
                    )}
                  </div>

                  {!mySub && !closed && (
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="Paste your submission link"
                        value={submitLinks[a.id] || ''}
                        onChange={(e) => setSubmitLinks((prev) => ({ ...prev, [a.id]: e.target.value }))}
                        className="text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#9BB2F6] w-56"
                      />
                      <button
                        onClick={() => handleSubmit(a.id)}
                        className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-slate-800 transition"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {mySub && (
                    <p className="text-[11px] text-gray-400">
                      Submitted {new Date(mySub.submittedAt).toLocaleString()}
                    </p>
                  )}
                  {!mySub && closed && (
                    <span className="text-xs font-semibold text-rose-500">Submission closed</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Assignment;