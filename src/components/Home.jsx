import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TaskList from './TaskList';

function Home() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const auth = useSelector((state) => state.auth.status);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate()
  // const [activeTodoId, setActiveTodoId] = useState(null);

  if (!auth) {
    return (
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 h-screen flex items-center justify-center text-white">
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-4">Not Logged In</h1>
          <p className="mb-6">Please log in or sign up to access your todos</p>
          <div className="flex gap-4 justify-center">
            <button onClick={()=>navigate('/login')}  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors">
              Login
            </button>
            <button onClick={()=>navigate('/signup')}  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:flex h-screen bg-gray-200">
      <Sidebar selectedTodo={setSelectedTodo} activeTodoId={selectedTodo}
      // selectedTodo={(todoId) => setActiveTodoId(todoId)} 
      // activeTodoId={activeTodoId}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="md:flex-1 h-screen md:p-6 overflow-auto p-4 bg-gray-200 ">
        {selectedTodo ? (
          <TaskList todoId={selectedTodo}  isSidebarOpen={isSidebarOpen}/>
        ) : (
          <div className="flex flex-col ml-40 items-center justify-center h-full text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-2xl font-semibold">Select a Todo</h2>
            <p className="mt-2">Choose a todo from the sidebar to view and manage tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;