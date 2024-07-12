// src/components/common/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaSignOutAlt, FaChartPie, FaUserFriends } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <div className="w-64 h-full shadow-md bg-white dark:bg-darkCard text-gray-700 dark:text-white">
            <ul className="py-4">
                <li className="px-6 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Link to="/usuarios" className="flex items-center">
                        <FaUsers className="mr-2" /> Usuarios
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Link to="/reportes" className="flex items-center">
                        <FaChartPie className="mr-2" /> Reportes
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Link to="/teams" className="flex items-center">
                        <FaUserFriends className="mr-2" /> Teams
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <button onClick={handleLogout} className="flex items-center w-full text-left">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
