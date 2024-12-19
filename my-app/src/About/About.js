import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import UpperLabel from "../Upperlabel/UpperLabel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { breadcrumbDashboard, systemTitle } from "../Constants/Const";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Course Menu/Home";
import Announcements from "../Course Menu/Announcements";
import Assignments from "../Course Menu/Assignments";
import Quizzes from "../Course Menu/Quizzes";
import Discussions from "../Course Menu/Discussions";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const menu = () => {
    setIsOpen(!isOpen);
  };

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "purpose", title: "Purpose" },
    { id: "features", title: "Features and Benefits" },
    { id: "members", title: "Members" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`main ${isOpen ? "open" : "closed"} flex-1 flex flex-col`}>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-800 text-white shadow p-1 pl-2 flex items-center justify-between">
          {systemTitle.map((title) => (
            <div key={title.title} className="flex items-center justify-center">
              <svg
                className="size-6 w-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={menu}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <h2 className="text-medium font-semibold pl-2">{title.title}</h2>
            </div>
          ))}

          <div className="flex items-center">
            <svg
              className="size-6 w-7 cursor-pointer pr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <div className="flex items-center pl-1 pr-3 cursor-pointer">
              <p className="text-sm pr-2">Cabatingan, Victorio Jr F.</p>
              <div className="w-10 h-10 rounded-full">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gray-200 border-b-2 dark:bg-gray-800">
          {breadcrumbDashboard.map((label) => (
            <div
              key={label.label}
              className="bg-white border-t flex items-center px-2 py-2 mx-auto overflow-x-auto whitespace-nowrap"
            >
              <p className="pr-8 text-sm">{label.label}</p>
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

              <span className="mx-4 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
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

        {/* Content Section */}
        <section
          className="flex flex-col md:flex-row"
          style={{ height: "calc(100vh - 4rem - 2rem)" }}
        >
          {/* Navigation Sidebar */}
          <nav className="w-full md:w-52 bg-white shadow-md">
            <ul className="py-2">
              {sections.map((section) => (
                <li key={section.id} className="px-2 py-1">
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left py-2 px-3 rounded transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-3 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">About Us</h1>

              {activeSection === "overview" && (
                <section className="mb-4 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-3 text-gray-700">Overview</h2>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <p className="text-gray-600 leading-relaxed">
                      The University of Eastern Philippines Learning Management System (LMS) is a cutting-edge educational platform designed to revolutionize the learning experience. Our system caters to both students and educators, providing a comprehensive digital environment for academic growth and collaboration.
                    </p>
                  </div>
                </section>
              )}

              {activeSection === "purpose" && (
                <section className="mb-4 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-3 text-gray-700">Purpose</h2>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <p className="text-gray-600 leading-relaxed">
                      Our LMS aims to bridge the gap between traditional and modern education methods. By leveraging technology, we seek to create an inclusive, flexible, and engaging learning environment that prepares students for the challenges of the digital age while empowering educators with innovative teaching tools.
                    </p>
                  </div>
                </section>
              )}

              {activeSection === "features" && (
                <section className="mb-4 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-3 text-gray-700">Features and Benefits</h2>
                  <div className="bg-white p-3 rounded-lg shadow-md space-y-2">
                    <p className="text-gray-600 leading-relaxed">
                      At the University of Eastern Philippines, our Learning Management System (LMS) is designed to enhance the educational experience for both students and educators. By integrating modern technology, the LMS provides easy access to high-quality educational content anytime, anywhere. This system fosters a flexible and inclusive learning environment, simplifying course management, content delivery, and administrative tasks.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Our LMS promotes interactive and collaborative learning through features like discussion forums, real-time communication tools, and group activities. It supports various multimedia formats, allowing educators to create engaging and dynamic content tailored to different learning styles. The platform also incorporates robust analytics, enabling educators to track student progress, identify areas for improvement, and provide personalized support to ensure academic success.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      In addition to enhancing classroom experiences, the LMS is mobile-friendly, ensuring that learning can take place on the go, breaking down barriers to education. It also supports continuous professional development by offering faculty training programs, ensuring that educators are equipped to maximize the platform's potential. At its core, our LMS is not just a tool but a transformative educational partner, fostering innovation, inclusivity, and excellence in learning.
                    </p>
                  </div>
                </section>
              )}

              {activeSection === "members" && (
                <section className="mb-4 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-3 text-gray-700">Members</h2>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                      
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Victorio F. Cabatingan Jr.</li>
                          <li>John Felix O. Castillo</li>
                          <li>John Lee P. Indino</li>
                        </ul>
                      </div>
                      <div>
                        
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Vince Khyle M. Mogatar</li>
                          <li>Josh Christian B. Ortiz</li>
                          <li>Agustin R. Pelicano Jr.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>
        </section>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};
