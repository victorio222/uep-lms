import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import DashboardCards from './DashboardCards';
import DashboardTable from './DashboardTable';
import UpperLabel from '../Upperlabel/UpperLabel';
import './dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { breadcrumbDashboard, systemTitle } from '../Constants/Const';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menu = () => {
        setIsOpen(!isOpen);
    }

    return (
        
        <div className="flex h-screen bg-gray-100">
            <div class={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <Sidebar />
            </div>

            <div className={`main ${isOpen ? 'open' : 'closed'} flex-1 flex flex-col`}>
                {/* Header */}
                <header className="sticky top-0 z-10 bg-gray-800 text-white shadow p-2 pl-5 flex items-center justify-between">
                    {systemTitle.map((title) => (
                        <div className='flex items-center justify-center'>
                            <svg
                                className="size-6 w-5 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
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

                            <h2 className="text-medium font-semibold pl-4">{title.title}</h2>
                        </div>
                    ))}

                    <div className='flex'>
                        <svg
                            className="size-6 w-7 cursor-pointer pr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                        <div className='flex items-center pl-1 pr-3 cursor-pointer'>
                            <p className='text-sm pr-2'>Cabatingan, Victorio Jr F.</p>
                            <div className='w-10 h-10 rounded-full'>
                                <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Avatar" />
                            </div>
                        </div>

                    </div>
                </header>
                {/* Breadcrumb part */}
                <div class="bg-gray-200 border-b-2 dark:bg-gray-800">
                    {breadcrumbDashboard.map((label) => (
                        <div class="bg-white border-t flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
                            <p className='pr-10 text-sm'>{label.label}</p>
                            <a href="#" class="text-gray-600 dark:text-gray-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4" viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </a>

                            <span class="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4" viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>

                            <a href="dashboard.js" class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                {label.sublabel}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <main className="flex-1 p-7">
                    <UpperLabel />
                    <DashboardCards />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;
