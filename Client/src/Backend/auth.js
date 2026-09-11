// // src/Backend/auth.js

// // Retrieve current logged-in user from LocalStorage
// export const getUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// // Save user session on successful login
// export const setUserSession = (userData) => {
//   localStorage.setItem('user', JSON.stringify(userData));
// };

// // Clear user session on logout
// export const logoutUser = () => {
//   localStorage.removeItem('user');
// };


// src/Backend/auth.js

// 1. Retrieve current logged-in user session
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// 2. Save current user session on login
export const setUserSession = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

// 3. Register a new user and add them to the persistent student list
export const registerUser = (newUserData) => {
  // Retrieve existing registered list or default to empty array
  const existingStudents = JSON.parse(localStorage.getItem('registered_students')) || [];

  const formattedStudent = {
    id: newUserData.id || `STU-${Date.now().toString().slice(-4)}`,
    name: newUserData.name || 'Student',
    email: newUserData.email,
    role: (newUserData.role || 'student').toLowerCase(),
    joinedDate: new Date().toLocaleDateString()
  };

  // Prevent duplicate registrations by email
  const userExists = existingStudents.some(s => s.email === formattedStudent.email);
  
  if (!userExists && formattedStudent.role === 'student') {
    existingStudents.push(formattedStudent);
    localStorage.setItem('registered_students', JSON.stringify(existingStudents));
  }

  // Set active session for the newly registered user
  setUserSession(formattedStudent);
  return formattedStudent;
};

// 4. Get all registered students for the Teachers/Admin view
export const getRegisteredStudents = () => {
  return JSON.parse(localStorage.getItem('registered_students')) || [];
};

// 5. Logout handler (removes current session ONLY)
export const logoutUser = () => {
  localStorage.removeItem('user');
  // 'registered_students' remains safe in localStorage
};