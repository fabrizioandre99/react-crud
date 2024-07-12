// src/components/common/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaSignOutAlt, FaChartPie } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <div className="w-64 h-full shadow-md bg-white">
            <ul className="py-4">
                <li className="px-6 py-2 hover:bg-gray-200">
                    <Link to="/usuarios" className="flex items-center text-gray-700">
                        <FaUsers className="mr-2" /> Usuarios
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-200">
                    <Link to="/reportes" className="flex items-center text-gray-700">
                        <FaChartPie className="mr-2" /> Reportes
                    </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-200">
                    <button onClick={handleLogout} className="flex items-center text-gray-700 w-full text-left">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
