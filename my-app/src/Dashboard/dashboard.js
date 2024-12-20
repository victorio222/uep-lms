// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './dashboard.css';
// import Sidebar from '../Sidebar/Sidebar';
// import Footer from '../Footer/Footer';
// import UpperLabel from '../Upperlabel/UpperLabel';
// import { systemTitle } from '../Constants/Const';

// const Dashboard = () => {
//     const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal toggle
//     const [newSubject, setNewSubject] = useState('');
//     const [subjects, setSubjects] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [selectedTeacher, setSelectedTeacher] = useState('');
//     const [filteredSubjects, setFilteredSubjects] = useState([]); // For search results

//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         fetchCourses();
//         fetchTeachers();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/courses');
//             setSubjects(response.data);
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//         }
//     };

//     const fetchTeachers = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/teachers');
//             setTeachers(response.data);
//         } catch (error) {
//             console.error('Error fetching teachers:', error);
//         }
//     };

//     const handleSearch = (event) => {
//         const query = event.target.value.toLowerCase();
//         setSearchQuery(query);
//         setFilteredSubjects(subjects.filter(subject => 
//             subject.courseName.toLowerCase().includes(query)
//         ));
//     };

//     const handleAddCourse = async () => {
//         if (!newSubject.trim() || !selectedTeacher) {
//             alert('Subject name and Teacher must be selected!');
//             return;
//         }

//         try {
//             const course = {
//                 courseName: newSubject,
//                 courseDescription: 'Description here',
//                 startDate: '2024-01-01',
//                 endDate: '2024-12-31',
//                 teacher: { teacherId: selectedTeacher },
//             };

//             const response = await axios.post('http://localhost:8080/courses/add', course);
//             alert(response.data);
//             fetchCourses();
//             setNewSubject('');
//             setSelectedTeacher('');
//             setIsModalOpen(false); // Close the modal
//         } catch (error) {
//             console.error('Error adding course:', error);
//             alert('An error occurred while adding the course.');
//         }
//     };

//     const handleDeleteCourse = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/courses/delete?id=${id}`);
//             fetchCourses();
//         } catch (error) {
//             console.error('Error deleting course:', error);
//             alert('An error occurred while deleting the course.');
//         }
//     };

//     return (
//         <div className="flex h-screen">
//             <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//                 <Sidebar />
//             </div>

//             <div className={`main ${isOpen ? 'open' : 'closed'} flex-1 flex flex-col`}>
//                 <header className="sticky top-0 z-10 bg-gray-800 text-white shadow p-2 pl-5 flex items-center justify-between">
//                     {systemTitle.map((title) => (
//                         <div key={title.title} className="flex items-center justify-center">
//                             <svg
//                                 className="size-6 w-5 cursor-pointer"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 onClick={() => setIsOpen(!isOpen)}
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                                 />
//                             </svg>
//                             <h2 className="text-medium font-semibold pl-4">{title.title}</h2>
//                         </div>
//                     ))}
//                 </header>

//                 <div className="bg-gray-200 border-b-2 dark:bg-gray-800">
//                     <div className="bg-white border-t flex items-center px-6 py-4 mx-auto">
//                         <p className="pr-10 text-sm">Dashboard</p>
//                     </div>
//                 </div>

//                 <main className="flex-1 p-7">
//                     <UpperLabel 
//                         searchQuery={searchQuery} 
//                         onSearch={(e) => handleSearch(e)} />

//                     {/* Modal Trigger */}
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
//                     >
//                         Add New Subject
//                     </button>

//                     {/* Modal */}
//                     {isModalOpen && (
//                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                             <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
//                                 <h3 className="font-semibold text-lg mb-4">Add New Subject</h3>
//                                 <input
//                                     type="text"
//                                     value={newSubject}
//                                     onChange={(e) => setNewSubject(e.target.value)}
//                                     placeholder="Enter subject name"
//                                     className="p-2 border rounded w-full mb-4"
//                                 />
//                                 <div>
//                                     <label htmlFor="teacher" className="block text-sm font-medium text-gray-700 mb-1">
//                                         Select Teacher:
//                                     </label>
//                                     <select
//                                         id="teacher"
//                                         value={selectedTeacher}
//                                         onChange={(e) => setSelectedTeacher(e.target.value)}
//                                         className="p-2 border rounded w-full"
//                                     >
//                                         <option value="">--Select Teacher--</option>
//                                         {teachers.map((teacher) => (
//                                             <option key={teacher.teacherId} value={teacher.teacherId}>
//                                                 {teacher.firstName} {teacher.lastName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mt-6 flex justify-end">
//                                     <button
//                                         onClick={() => setIsModalOpen(false)}
//                                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleAddCourse}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                                     >
//                                         Add
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Display Courses */}
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//                         {subjects.map((subject) => (
//                             <div
//                                 key={subject.courseId}
//                                 className="relative bg-white shadow-md text-center hover:shadow-lg transition-shadow duration-200"
//                             >
//                                 <div
//                                     className="h-24 flex items-center justify-center"
//                                     style={{ backgroundColor: subject.color }}
//                                 ></div>
//                                 <p>{subject.courseDescription}</p>
//                                 <h4 className="p-3 text-md text-left font-normal text-gray-700">
//                                     {subject.courseName}
//                                 </h4>
//                                 <button
//                                     onClick={() => handleDeleteCourse(subject.courseId)}
//                                     className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



// import React, { useState, useEffect } from "react";
// import { BookOpenIcon } from '@heroicons/react/24/solid';
// import axios from "axios";
// import "./dashboard.css";
// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footer/Footer";
// import UpperLabel from "../Upperlabel/UpperLabel";
// import { systemTitle } from "../Constants/Const";

// const Dashboard = () => {
//     const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal toggle
//     const [newSubject, setNewSubject] = useState("");
//     const [subjects, setSubjects] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [selectedTeacher, setSelectedTeacher] = useState("");
//     const [filteredSubjects, setFilteredSubjects] = useState([]); // For search results
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         fetchCourses();
//         fetchTeachers();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/courses");
//             setSubjects(response.data);
//             setFilteredSubjects(response.data); // Initialize filtered list
//         } catch (error) {
//             console.error("Error fetching courses:", error);
//         }
//     };

//     const fetchTeachers = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/teachers");
//             setTeachers(response.data);
//         } catch (error) {
//             console.error("Error fetching teachers:", error);
//         }
//     };

//     const handleSearch = (event) => {
//         const query = event.target.value.toLowerCase();
//         setSearchQuery(query);
//         if (query.trim()) {
//             setFilteredSubjects(
//                 subjects.filter((subject) =>
//                     subject.courseName.toLowerCase().includes(query)
//                 )
//             );
//         } else {
//             setFilteredSubjects(subjects); // Reset to all courses
//         }
//     };

//     const handleAddCourse = async () => {
//         if (!newSubject.trim() || !selectedTeacher) {
//             alert("Subject name and Teacher must be selected!");
//             return;
//         }
        
//         try {
//             const course = {
//                 courseName: newSubject,
//                 courseDescription: "Description here",
//                 startDate: "2024-01-01",
//                 endDate: "2024-12-31",
//                 teacher: { teacherId: selectedTeacher },
//             };

//             const response = await axios.post(
//                 "http://localhost:8080/courses/add",
//                 course
//             );
//             alert(response.data);
//             fetchCourses();
//             setNewSubject("");
//             setSelectedTeacher("");
//             setIsModalOpen(false); // Close the modal
//         } catch (error) {
//             console.error("Error adding course:", error);
//             alert("An error occurred while adding the course.");
//         }
//     };

//     const handleChangeStatus = async (id) => {
//         try {
//             const response = await axios.put(`http://localhost:8080/courses/${id}/update`);
//             alert(response.data);
//             fetchCourses();
//         } catch (error) {
//             console.error("Error changing status:", error);
//             alert("An error occurred while changing the course status.");
//         }
//     };

//     const courseStatusDisplay = (courseStatus) => {
//         if (courseStatus.toLowerCase() === "published"){
//             return "Unpublish"
//         } else{
//             return "Publish"
//         }
//     }

//     return (
//         <div className="flex h-screen">
//           <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//             <Sidebar />
//           </div>
      
//           <div className={`main ${isOpen ? "open" : "closed"} flex-1 flex flex-col`}>
//             <header className="sticky top-0 z-10 bg-gray-800 text-white shadow p-2 pl-5 flex items-center justify-between">
//               {systemTitle.map((title) => (
//                 <div key={title.title} className="flex items-center justify-center">
//                   <svg
//                     className="size-6 w-5 cursor-pointer"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     onClick={() => setIsOpen(!isOpen)}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                     />
//                   </svg>
//                   <h2 className="text-medium font-semibold pl-4">{title.title}</h2>
//                 </div>
//               ))}
//             </header>
      
//             <div className="bg-gray-200 border-b-2 dark:bg-gray-800">
//               <div className="bg-white border-t flex items-center px-6 py-4 mx-auto">
//                 <p className="pr-10 text-sm">Dashboard</p>
//               </div>
//             </div>
      
//             <main className="flex-1 p-7">
//               <UpperLabel
//                 searchQuery={searchQuery}
//                 onSearch={handleSearch}
//               />
      
//               {/* Modal Trigger */}
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
//               >
//                 Add New Subject
//               </button>
      
//               {/* Modal */}
//               {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                   <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
//                     <h3 className="font-semibold text-lg mb-4">Add New Subject</h3>
//                     <input
//                       type="text"
//                       value={newSubject}
//                       onChange={(e) => setNewSubject(e.target.value)}
//                       placeholder="Enter course name"
//                       className="p-2 border rounded w-full mb-4"
//                     />
//                     <textarea
//                       cols={4}
//                       value={newSubject}
//                       onChange={(e) => setNewSubject(e.target.value)}
//                       placeholder="Enter course description"
//                       className="p-2 border rounded w-full mb-4"
//                     />
//                     <div className="text-gray-700">
//                       <label
//                         htmlFor="teacher"
//                         className="block text-sm font-medium mb-1"
//                       >
//                         Select Teacher:
//                       </label>
//                       <select
//                         id="teacher"
//                         value={selectedTeacher}
//                         onChange={(e) => setSelectedTeacher(e.target.value)}
//                         className="p-2 border rounded w-full"
//                       >
//                         <option value="">--Select Teacher--</option>
//                         {teachers.map((teacher) => (
//                           <option key={teacher.teacherId} value={teacher.teacherId}>
//                             {teacher.firstName} {teacher.lastName}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="mt-6 flex justify-end">
//                       <button
//                         onClick={() => setIsModalOpen(false)}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleAddCourse}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
      
//               {/* Display Courses */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
//                 {filteredSubjects.length > 0 ? (
//                   filteredSubjects.map((subject) => (
//                     <div
//                       key={subject.courseId}
//                       className={`group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out transform hover:translate-y-3 ${
//                         subject.status === "unpublished" ? "opacity-50 grayscale" : ""
//                       }`}
//                     >
//                       <div
//                         className={`h-32 flex items-center justify-center ${
//                           subject.status === "unpublished" ? "saturate-50" : ""
//                         }`}
//                         style={{ backgroundColor: subject.color }}
//                       >
//                         <div className="circle group-hover:scale-150 group-hover:rotate-180 group-hover:bg-blue-500 transition-all duration-500 ease-in-out">
//                           <span>
//                             <BookOpenIcon className="w-6 h-6 text-white" />
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-4 group-hover:bg-gray-50 group-hover:shadow-2xl transition-all duration-300 ease-in-out">
//                         <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-500 group-hover:scale-105 group-hover:underline transition-all duration-300 ease-in-out">
//                           {subject.courseName}
//                         </h4>
//                         <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 group-hover:scale-105 transition-all duration-300 ease-in-out">
//                           {subject.courseDescription}
//                         </p>
//                         <button
//                           onClick={() => handleChangeStatus(subject.courseId)}
//                           className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
//                             subject.status === "active"
//                               ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-md"
//                               : subject.status === "unpublished"
//                               ? "bg-gray-400 text-gray-600 hover:bg-gray-500 hover:shadow-md"
//                               : "bg-red-500 hover:bg-red-600 text-white hover:shadow-md"
//                           }`}
//                         >
//                           {courseStatusDisplay(subject.status)}
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-full flex justify-center items-center h-32">
//                     <p className="text-gray-500 text-center">No available courses.</p>
//                   </div>
//                 )}
//               </div>
//             </main>
      
//             <Footer />
//           </div>
//         </div>
//       );
      
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import { BookOpenIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import "./dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import UpperLabel from "../Upperlabel/UpperLabel";
import { breadcrumbDashboard, systemTitle } from "../Constants/Const";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal toggle
    const [newSubject, setNewSubject] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [filteredSubjects, setFilteredSubjects] = useState([]); // For search results
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCourses();
        fetchTeachers();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/courses");
            setSubjects(response.data);
            setFilteredSubjects(response.data); // Initialize filtered list
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/teachers");
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        if (query.trim()) {
            setFilteredSubjects(
                subjects.filter((subject) =>
                    subject.courseName.toLowerCase().includes(query)
                )
            );
        } else {
            setFilteredSubjects(subjects); // Reset to all courses
        }
    };

    const handleAddCourse = async () => {
        if (!newSubject.trim() || !selectedTeacher) {
            alert("Subject name and Teacher must be selected!");
            return;
        }
        
        try {
            const course = {
                courseName: newSubject,
                courseDescription: "Description here",
                startDate: "2024-01-01",
                endDate: "2024-12-31",
                teacher: { teacherId: selectedTeacher },
            };

            const response = await axios.post(
                "http://localhost:8080/courses/add",
                course
            );
            alert(response.data);
            fetchCourses();
            setNewSubject("");
            setSelectedTeacher("");
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error adding course:", error);
            alert("An error occurred while adding the course.");
        }
    };

    const handleChangeStatus = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/courses/${id}/update`);
            alert(response.data);
            fetchCourses();
        } catch (error) {
            console.error("Error changing status:", error);
            alert("An error occurred while changing the course status.");
        }
    };

    const courseStatusDisplay = (courseStatus) => {
        if (typeof courseStatus === 'string') {
            if (courseStatus.toLowerCase() === "published") {
                return "Unpublish";
            } else {
                return "Publish";
            }
        }
        return "Unknown"; // Fallback for undefined or invalid status
    };

    return (
        <div className="flex h-screen">
          <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <Sidebar />
          </div>
      
          <div className={`main ${isOpen ? "open" : "closed"} flex-1 flex flex-col`}>
            <header className="sticky top-0 z-10 bg-gray-800 text-white shadow p-2 pl-5 flex items-center justify-between">
              {systemTitle.map((title) => (
                <div key={title.title} className="flex items-center justify-center">
                  <svg
                    className="size-6 w-5 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <h2 className="text-medium font-semibold pl-4">{title.title}</h2>
                </div>
              ))}
            </header>
      
            {/* Breadcrumb */}
         <div className="bg-gray-200 border-b-2 dark:bg-gray-800">
           {breadcrumbDashboard.map((label) => (
            <div
              key={label.label}
              className="bg-white border-t flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap"
            >
              <p className="pr-10 text-sm">{label.label}</p>
              <a href="#" className="text-gray-600 dark:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </a>

              <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <a
                href="dashboard.js"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {label.sublabel}
              </a>
            </div>
          ))}
        </div>
      
            <main className="flex-1 p-7">
              <UpperLabel
                searchQuery={searchQuery}
                onSearch={handleSearch}
              />
      
              {/* Modal Trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
              >
                Add New Subject
              </button>
      
              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
                    <h3 className="font-semibold text-lg mb-4">Add New Subject</h3>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="Enter course name"
                      className="p-2 border rounded w-full mb-4"
                    />
                    <textarea
                      cols={4}
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="Enter course description"
                      className="p-2 border rounded w-full mb-4"
                    />
                    <div className="text-gray-700">
                      <label
                        htmlFor="teacher"
                        className="block text-sm font-medium mb-1"
                      >
                        Select Teacher:
                      </label>
                      <select
                        id="teacher"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                        className="p-2 border rounded w-full"
                      >
                        <option value="">--Select Teacher--</option>
                        {teachers.map((teacher) => (
                          <option key={teacher.teacherId} value={teacher.teacherId}>
                            {teacher.firstName} {teacher.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddCourse}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
      
              {/* Display Courses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <div
                      key={subject.courseId}
                      className={`group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-500 ease-in-out transform hover:translate-y-3 ${
                        subject.status === "unpublished" ? "opacity-50 grayscale" : ""
                      }`}
                    >
                      <div
                        className={`h-32 flex items-center justify-center ${
                          subject.status === "unpublished" ? "saturate-50" : ""
                        }`}
                        style={{ backgroundColor: subject.color }}
                      >
                        <div className="circle group-hover:scale-150 group-hover:rotate-180 group-hover:bg-blue-500 transition-all duration-500 ease-in-out">
                          <span>
                            <BookOpenIcon className="w-6 h-6 text-white" />
                          </span>
                        </div>
                      </div>
                      <div className="p-4 group-hover:bg-gray-50 group-hover:shadow-2xl transition-all duration-300 ease-in-out">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-500 group-hover:scale-105 group-hover:underline transition-all duration-300 ease-in-out">
                          {subject.courseName}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 group-hover:scale-105 transition-all duration-300 ease-in-out">
                          {subject.courseDescription}
                        </p>
                        <button
                          onClick={() => handleChangeStatus(subject.courseId)}
                          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                            subject.status === "active"
                              ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-md"
                              : subject.status === "unpublished"
                              ? "bg-gray-400 text-gray-600 hover:bg-gray-500 hover:shadow-md"
                              : "bg-red-500 hover:bg-red-600 text-white hover:shadow-md"
                          }`}
                        >
                          {courseStatusDisplay(subject.status)}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex justify-center items-center h-32">
                    <p className="text-gray-500 text-center">No available courses.</p>
                  </div>
                )}
              </div>
            </main>
      
            <Footer />
          </div>
        </div>
      );
};

export default Dashboard;
