import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import Login from './login';

function Home() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const auth = useSelector((state) => state.auth.status);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // const [activeTodoId, setActiveTodoId] = useState(null);

  if (!auth) {
    return (
      <div >
       <Login/>
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
          <div className="flex flex-col md:ml-40 items-center justify-center h-full text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-2xl font-semibold">Select a Todo</h2>
            <p className="mt-2 text-center">Choose a todo from the sidebar to view and manage tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;