import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../appwrite/auth';
import { login as authLogin } from '../store/authstore';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Default notepad color
    const [notepadColor, setNotepadColor] = useState("#F1F8E8");
    const [loading,setLoading]=useState(false)

    const signup = async (data) => {
        setLoading(true)
        setError('');
        try {
            const session = await auth.Signup(data);
            if (session) {
                const userData = await auth.getUser();
                if (userData) {dispatch(authLogin(userData));}
                // else setLoading(true)

                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError(error.message);
            console.log(error, ': In signup');
        }
        finally{
            setLoading(false)
        }
    };

    return (
        
        <section className="flex justify-center bg-gray-100 h-screen items-center p-4">
           
            <div className="w-full max-w-md mx-auto">
                {/* Notepad-style container */}
                <div className="rounded-lg shadow-lg relative overflow-hidden" 
                     style={{ backgroundColor: notepadColor }}>
                    
                    {/* Red margin line on left */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300"></div>
                    
                    {/* Paper holes */}
                    <div className="absolute left-4 top-8 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                    <div className="absolute left-4 top-24 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                    <div className="absolute left-4 top-40 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                    
                    {/* Content area with lined background */}
                    <div className="relative ml-12 py-8 px-6" 
                         style={{
                             backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                             backgroundSize: '100% 2rem',
                             backgroundPosition: '0 1rem',
                             backgroundColor: notepadColor
                         }}>
                        
                        {/* Signup header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800" 
                                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                Create Account
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Sign up to start managing your notes
                            </p>
                        </div>

                        {/* Signup form */}
                        <form onSubmit={handleSubmit(signup)} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 bg-white bg-opacity-70 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 outline-none"
                                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                    {...register("name", {
                                        required: "Name is required"
                                    })}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-2 bg-white bg-opacity-70 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 outline-none"
                                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                    {...register("email", {
                                        required: "Email is required",
                                        validate: {
                                            matchPattern: (value) => 
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Please enter a valid email address"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password (8 digits)
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 bg-white bg-opacity-70 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 outline-none"
                                    style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            {error && (
                                <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md"
                            >
                               {loading ? <div>Loading...</div>:<div>Create Account</div>} 
                            </button>
                        </form>

                        <div className="mt-8 text-center pb-4">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link 
                                    to='/login'
                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;