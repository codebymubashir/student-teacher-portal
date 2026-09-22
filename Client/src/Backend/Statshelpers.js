import { doc, updateDoc, increment, getDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

/**
 * ATTENDANCE — call this every time a teacher marks a student present/absent.
 * Recalculates the percentage from scratch (daysPresent / totalDays * 100).
 */
export const markAttendance = async (studentUid, isPresent) => {
  const studentRef = doc(db, "students", studentUid)
  const studentSnap = await getDoc(studentRef)

  if (!studentSnap.exists()) return

  const data = studentSnap.data()
  const daysPresent = (data.daysPresent || 0) + (isPresent ? 1 : 0)
  const totalDays = (data.totalDays || 0) + 1
  const attendancePercent = Math.round((daysPresent / totalDays) * 100)

  await updateDoc(studentRef, {
    daysPresent,
    totalDays,
    attendance: attendancePercent,
  })
}

/**
 * TASKS COMPLETED — call this when a student submits an assignment.
 * Simply increments the counter by 1.
 */
export const markTaskCompleted = async (studentUid) => {
  const studentRef = doc(db, "students", studentUid)
  await updateDoc(studentRef, {
    tasksCompleted: increment(1),
  })
}

/**
 * TASKS IN PROGRESS — recalculate as a percentage of assigned vs completed.
 * Call this whenever a new assignment is assigned OR one is completed.
 */
export const updateTasksInProgress = async (studentUid) => {
  const studentRef = doc(db, "students", studentUid)
  const studentSnap = await getDoc(studentRef)

  if (!studentSnap.exists()) return

  const data = studentSnap.data()
  const totalAssigned = data.totalAssignments || 0
  const completed = data.tasksCompleted || 0
  const pending = totalAssigned - completed
  const progressPercent = totalAssigned > 0 ? Math.round((pending / totalAssigned) * 100) : 0

  await updateDoc(studentRef, {
    tasksInProgress: progressPercent,
  })
}

/**
 * REWARD POINTS — call this when a referral converts, or any milestone is hit.
 * `points` = how many to add (can be negative to deduct).
 */
export const addRewardPoints = async (studentUid, points) => {
  const studentRef = doc(db, "students", studentUid)
  await updateDoc(studentRef, {
    rewardPoints: increment(points),
  })
}