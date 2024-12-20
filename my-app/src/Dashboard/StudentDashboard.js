import React, { useState, useEffect } from "react";
import { BookOpenIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import "./dashboard.css";
import StudentSidebar from "../Sidebar/StudentSidebar";
import Footer from "../Footer/Footer";  
import UpperLabel from "../Upperlabel/UpperLabel";
import { systemTitle } from "../Constants/Const";
import { useLocation } from "react-router-dom";
import { useUser } from "../UserProvider/UserContext";

const StudentDashboard = () => {
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]); // For search results
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    // const user = location.state?.user;
    const {user} = useUser();

    // Check if the user is available
    // if (!user) {
    //     // Handle the case when the user is not passed
    //     console.log("No user data available");
    //     return <p>No user data available</p>;
    // }

    // Now, use the user data
    console.log("User data in dashboard:", user);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchCourses();
    }, [user]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${user.userId}/courses`);
            setSubjects(response.data);
            setFilteredSubjects(response.data); // Initialize filtered list
            console.log("subjects: " + subjects)
        } catch (error) {
            console.error("Error fetching courses:", error);
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

    return (
        <div className="flex h-screen">
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <StudentSidebar />
            </div>

            <div
                className={`main ${isOpen ? "open" : "closed"} flex-1 flex flex-col`}
            >
                <header className="sticky top-0 z-10 bg-gray-800 text-white shadow p-2 pl-5 flex items-center justify-between">
                    {systemTitle.map((title) => (
                        <div
                            key={title.title}
                            className="flex items-center justify-center"
                        >
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
                            <h2 className="text-medium font-semibold pl-4">
                                {title.title}
                            </h2>
                        </div>
                    ))}
                </header>

                <div className="bg-gray-200 border-b-2 dark:bg-gray-800">
                    <div className="bg-white border-t flex items-center px-6 py-4 mx-auto">
                        <p className="pr-10 text-sm">Dashboard</p>
                    </div>
                </div>

                <main className="flex-1 p-7">
                    <UpperLabel
                        searchQuery={searchQuery}
                        onSearch={handleSearch}
                    />


                    {/* Display Courses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject) => (
                        <div
                            key={subject.courseId}
                            className={`group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 ${
                            subject.status === 'unpublished' ? 'opacity-50 grayscale' : '' // Dull appearance for unpublished
                            }`} >

                            <div
                            className={`h-32 flex items-center justify-center ${
                                subject.status === 'unpublished' ? 'saturate-50' : ''
                            }`}
                            style={{ backgroundColor: subject.color }}
                            >
                            <div className="circle group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300">
                                <span><BookOpenIcon className="w-6 h-6 text-white" /></span>
                            </div>
                            </div>
                            <div className="p-4 group-hover:bg-gray-50 transition-colors duration-300">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                {subject.courseName}
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                {subject.courseDescription}
                            </p>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center h-32">
                        <p className="text-gray-500 text-center">
                            No available courses.
                        </p>
                        </div>
                    )}
                </div>


                </main>
                <Footer />
            </div>
        </div>
    );
};

export default StudentDashboard;
