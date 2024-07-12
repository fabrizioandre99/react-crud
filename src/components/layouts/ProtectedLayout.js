// src/components/layouts/ProtectedLayout.js
import React from 'react';
import Sidebar from '../common/Sidebar';
import TopBar from '../common/TopBar';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = ({ toggleDarkMode, darkMode }) => {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-darkBg">
            <Sidebar />
            <div className="flex-grow flex flex-col">
                <TopBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                <div className="flex-grow p-8 bg-gray-100 dark:bg-darkBg text-gray-900 dark:text-white">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProtectedLayout;
