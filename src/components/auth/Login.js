import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simular autenticación
        if (email === 'user@example.com' && password === 'password') {
            localStorage.setItem('auth', 'true');
            navigate('/usuarios');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-teal-500 flex flex-col justify-center items-center p-8">
                <h1 className="text-4xl font-bold text-white mb-4">Ticketed.</h1>
                <p className="text-white text-lg mb-6">
                    Purchase your own ticket,<br />
                    Select the date and time,<br />
                    Pay through the application,<br />
                    And enjoy your holiday!
                </p>
                <img src="https://57hours.com/wp-content/uploads/2021/12/huayna-picchu.png" alt="Borobudur" className="w-full h-auto" />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
                    <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="inline mr-2" />
                        Login with Google
                    </button>
                    <form onSubmit={handleLogin} className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="example@gmail.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Login
                        </button>
                        <div className="flex justify-between text-sm">
                            <a href="#" className="text-teal-500 hover:underline">Forget password?</a>
                            <a href="#" className="text-teal-500 hover:underline">Sign Up for free</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simular autenticación
        if (email === 'user@example.com' && password === 'password') {
            localStorage.setItem('auth', 'true');
            navigate('/usuarios');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center p-8 text-white">
                <div className="text-4xl font-bold mb-4">Hello SaleSkip!👋</div>
                <p className="text-lg mb-6">
                    Skip repetitive and manual sales-marketing tasks.<br />
                    Get highly productive through automation and save tons of time!
                </p>
                <div className="mt-auto text-center">
                    © 2022 SaleSkip. All rights reserved.
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-2 text-center">SaleSkip</h2>
                    <p className="text-center mb-6">Welcome Back!</p>
                    <p className="text-center text-sm mb-4">
                        Don't have an account? <a href="#" className="text-blue-600">Create a new account now</a>, it's FREE! Takes less than a minute.
                    </p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="your-email@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            Login Now
                        </button>
                        <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="inline mr-2" />
                            Login with Google
                        </button>
                        <div className="text-sm text-center mt-4">
                            <a href="#" className="text-blue-600 hover:underline">Forget password? Click here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
 */
