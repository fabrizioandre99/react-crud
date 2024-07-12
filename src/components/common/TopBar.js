// src/components/common/TopBar.js
import React, { useState } from 'react';
import { FaSun, FaMoon, FaBell, FaUserCircle } from 'react-icons/fa';

const TopBar = ({ toggleDarkMode, darkMode }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-darkCard shadow-md text-gray-900 dark:text-white">
            <input
                type="text"
                placeholder="Type here..."
                className="px-4 py-2 rounded-full border focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="focus:outline-none">
                    {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
                </button>
                <button onClick={toggleNotifications} className="relative focus:outline-none">
                    <FaBell className="text-gray-700 dark:text-white" />
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-darkCard shadow-lg rounded-lg">
                            <div className="p-4 border-b dark:border-gray-700">
                                <span className="font-semibold text-gray-800 dark:text-gray-300">Notifications</span>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start space-x-4">
                                    <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-full w-10 h-10" />
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>New message</strong> from Laur
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">13 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 mt-4">
                                    <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-full w-10 h-10" />
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>New album</strong> by Travis Scott
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 mt-4">
                                    <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-full w-10 h-10" />
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            Payment <strong>successfully completed</strong>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </button>
                <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-700 dark:text-gray-300">John Doe</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
