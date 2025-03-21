import { Menu, MoreVertical, X } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createTodos, deleteTodos, fetchTodos, updateTodo } from '../store/todoSlice';
import Logout from './Logout';

function Sidebar({ selectedTodo, activeTodoId, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items || []);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos('userId'));
  }, [dispatch]);

  const handleAddTodo = () => setIsAddingTodo(true);

  const handleSubmitTodo = () => {
    if (newTodoTitle.trim()) {
      dispatch(createTodos({ userId: 'userId', title: newTodoTitle }));
      setNewTodoTitle('');
      setIsAddingTodo(false);
    }
  };

  const handleCancelAdd = () => {
    setNewTodoTitle('');
    setIsAddingTodo(false);
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.$id);
    setEditTitle(todo.title);
    setOpenMenuId(null);
  };

  const handleUpdateTodo = (todoId) => {
    if (editTitle.trim()) {
      dispatch(updateTodo({ todoId, title: editTitle }));
      setEditingTodoId(null);
      setEditTitle('');
    }
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodos(todoId));
    setOpenMenuId(null);
  };

  const toggleMenu = (todoId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === todoId ? null : todoId);
  };

  return (
    <div className={`fixed left-0 top-0  h-screen ${isSidebarOpen ? " z-50 md:w-0 w-full md:z-0" : "z-0"}`}>
      <button 
        className="fixed top-4 left-4 p-2 z-100 focus:outline-none "
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
      </button>
      <div
        className={`md:w-72 w-full h-screen bg-gray-900 text-white  shadow-xl transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 opacity-100 z-50" : "-translate-x-full opacity-0"
        }`}
      >
      
      {isSidebarOpen && (
        <div className="md:w-72  z-50 w-full h-screen bg-gray-900 text-white p-6 shadow-xl transition-all duration-300 ease-in-out">
          <div className="pt-10">
            <h1 className="text-xl font-bold mb-6 text-center">My Todos</h1>

            {isAddingTodo ? (
              <div className="mb-6 bg-gray-800 p-3 rounded-lg shadow-inner">
                <input
                  type="text"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Todo title..."
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmitTodo();
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmitTodo}
                    className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded transition-colors flex items-center justify-center"
                  >
                    <FaCheck className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors flex items-center justify-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAddTodo}
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded mb-6 transition-colors flex items-center justify-center shadow-md"
              >
                <FaPlus className="mr-2" /> Add Todo
              </button>
            )}

            <div className="mt-4 overflow-y-auto max-h-[calc(100vh-220px)]">
              {todos.length > 0 ? (
                <ul className="space-y-2">
                  {todos.map((todo) => (
                    <li
                      key={todo.$id}
                      className={`group p-3 cursor-pointer rounded transition-all duration-200 flex items-center justify-between ${
                        activeTodoId === todo.$id ? 'bg-gray-700 shadow-md' : 'hover:bg-gray-700'
                      }`}
                      onClick={() => selectedTodo(todo.$id)}
                    >
                      {editingTodoId === todo.$id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded mr-2 focus:outline-none focus:border-blue-500 transition-colors"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUpdateTodo(todo.$id);
                            if (e.key === 'Escape') setEditingTodoId(null);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="flex-1 truncate font-medium">{todo.title}</span>
                      )}

                      {editingTodoId === todo.$id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateTodo(todo.$id);
                            }}
                            className="text-green-400 hover:text-green-300 transition-colors p-1"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTodoId(null);
                            }}
                            className="text-gray-400 hover:text-gray-300 transition-colors p-1"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={(e) => toggleMenu(todo.$id, e)}
                            className={`p-1 rounded-full hover:bg-gray-600 transition-colors ${
                              activeTodoId === todo.$id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          {openMenuId === todo.$id && (
                            <div className="absolute right-0 mt-1 w-24 bg-gray-800 rounded shadow-lg z-10">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditTodo(todo);
                                }}
                                className="w-full text-left p-2 hover:bg-gray-700 transition-colors flex items-center"
                              >
                                <FaEdit className="mr-2 text-blue-400" /> Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteTodo(todo.$id);
                                }}
                                className="w-full text-left p-2 hover:bg-gray-700 transition-colors flex items-center"
                              >
                                <FaTrash className="mr-2 text-red-400" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400 text-center mt-6 p-4 bg-gray-800 rounded-lg">
                  <div className="mb-2">No todos yet.</div>
                  <div className="text-sm">Create one to get started!</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute  left-0 right-0 bottom-0">
            <Logout />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Sidebar;