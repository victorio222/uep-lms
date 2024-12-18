// import './App.css';
// import Login from './Login/Login';
// import Dashboard from './Dashboard/dashboard';
// import Calendar from './Calendar/Calendar'
// import Course from './Courses/Course';

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <Dashboard />
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { Suspense } from "react";
// import { BrowserRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login/Login";
// import Dashboard from "./Dashboard/dashboard";
// import Course from "./Courses/Course";
// import Calendar from "./Calendar/Calendar"
// import LoadingSpinner from "./components/LoadingSpinner.Js";


// function App() {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   return (
//     <BrowserRouter>
//       <Suspense fallback={<LoadingSpinner />}>
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? (
//               <Dashboard />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//         <Route path="/course/*" element={<Course />} />
//         <Route path="/calendar" element={<Calendar />} />
//         {/* <Route path="/course" element={<Course />} /> */}
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/dashboard";
import Course from "./Courses/Course";
import Calendar from "./Calendar/Calendar";
import Messages from "./Messages/Messages";
import Loading from "./components/Loading";
import Spinner from "./components/Spinner";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data or other tasks)
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, stop loading
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : ( 
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/*" element={<Course />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
