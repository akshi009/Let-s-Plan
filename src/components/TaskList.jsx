import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwritetodo from "../appwrite/todo_appwrite";
import { deleteSubTask } from "../store/subtaskSlice";
import { createTask, deleteTask, fetchTasks, updateTask } from "../store/taskSlice";
import SubtaskList from "./Subtask";

// Import Swiper styles and components
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function TaskList({ todoId, isSidebarOpen }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items || []);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FEFCE8");
  
  // Available color options for notepads
  const colorOptions = [
    { name: "Yellow", value: "#FEFCE8", borderColor: "#FACC15" },
    { name: "Blue", value: "#E8F9FF", borderColor: "#3B82F6" },
    { name: "Green", value: "#F1F8E8", borderColor: "#10B981" },
    { name: "Pink", value: "#FFEFEF", borderColor: "#EC4899" },
    { name: "Purple", value: "#F5F1FF", borderColor: "#8B5CF6" },
    { name: "Orange", value: "#FAF1E6", borderColor: "#F97316" },
    { name: "Gray", value: "#F0FAFA", borderColor: "#6B7280" },
  ];

  useEffect(() => {
    if (todoId) dispatch(fetchTasks(todoId));
  }, [dispatch, todoId]);

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
    setSelectedColor("#FEFCE8");
  };

  const handleAddTaskSubmit = () => {
    if (newTaskTitle && newTaskTitle.trim().length > 0 && newTaskTitle.length <= 3000) {
      dispatch(createTask({ 
        todoId, 
        title: newTaskTitle, 
        complete: false,
        color: selectedColor,
      }));
      setNewTaskTitle("");
      setIsAddingTask(false);
    } else if (newTaskTitle && (newTaskTitle.trim().length === 0 || newTaskTitle.length > 3000)) {
      alert("Task title must be between 1 and 3000 characters");
    }
  };

  const deleteTaskList = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      console.log('test 1')
      dispatch(deleteSubTask(taskId));
      console.log('test 2')
      dispatch(deleteTask(taskId));
      console.log('test 3')
    }
  };

  const handleEditStart = (task) => {
    setEditingTaskId(task.$id);
    setEditText(String(task.title));
    setSelectedColor(task.color || "#FEFCE8");
  };

  const handleEditSave = async (taskId) => {
    if (!editText.trim() || editText.length > 3000) {
      alert("Task title must be between 1 and 3000 characters");
      return;
    }
console.log(editText);
    try {
      await appwritetodo.updateTask(taskId, 
        editText,
       selectedColor,
      );
      dispatch(updateTask({ 
        taskId, 
        title: editText,
        color: selectedColor,
      }));
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task title:", error);
      alert("Failed to update task title");
    }
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
  };

  // useEffect(() => {
  //   if (todoId) dispatch(fetchTasks(todoId));
  // }, [dispatch, todoId]);

  const todos = useSelector((state) => state.todos.items);

  const selectedtodo = todos.find((todo) => todo.$id === todoId);

  if (!selectedtodo) {
    return (
      <div className={`rounded-lg min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-lg">Todo not found</p>
          <p className="mt-1">Please select a valid todo.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={` rounded-lg md:p-6 p-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'md:ml-72' : 'ml-0'
      }`}
    >
      <div className="flex flex-col  md:flex-row md:justify-between md:items-center mb-8">
       
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0 mx-10">{selectedtodo.title}</h2>
        
        {!isAddingTask && (
          <button
            onClick={handleAddTaskClick}
            className="bg-blue-600 justify-center hover:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded-lg shadow-md flex items-center text-center transition-all transform  duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Task
          </button>
        )}
        
      {isAddingTask && (
        <div className="  overflow-hidden">
         
          
          <div className="p-4 gap-4 md:flex bg-gray-100 rounded">
            

            <div className="mb-4 w-full">
              <input
                type="text"
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTaskSubmit();
                  }
                }}
                style={{ 
                  fontFamily: "'Comic Sans MS', cursive, sans-serif",
                  // backgroundColor: selectedColor,
                }}
                autoFocus
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 font-medium px-5  rounded-lg transition-colors"
                onClick={() => {
                  setNewTaskTitle("");
                  setIsAddingTask(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 cursor-pointer md:py-0 py-2 hover:bg-green-700 text-white font-medium px-5  rounded-lg transition-colors"
                onClick={handleAddTaskSubmit}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      

      {tasks?.length > 0 ? (
        <>
          {/* Mobile View: Swiper Carousel */}
          <div className="block md:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {tasks.map((task) =>
                task && task.$id ? (
                  <SwiperSlide key={task.$id}>
                    <div className="mx-auto w-full mb-10">
                      <div className="rounded-lg shadow-lg relative overflow-hidden transform transition-transform h-screen"
                         style={{ backgroundColor: task.color || "#FEFCE8" }}>
                        {/* Red margin line on left */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300"></div>
                        
                        {/* Paper holes */}
                        <div className="absolute left-4 top-8 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                        <div className="absolute left-4 top-24 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                        <div className="absolute left-4 top-40 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                        
                        {/* Content area with blue lines background pattern */}
                        <div className="relative ml-12 py-6" 
                             style={{
                               backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                               backgroundSize: '100% 2rem',
                               backgroundPosition: '0 1rem',
                               backgroundColor: task.color || "#FEFCE8"
                             }}>
                          
                          {/* Task title */}
                          <div className="px-4 mb-6">
                            {editingTaskId === task.$id ? (
                              <div className="flex flex-col space-y-4">
                                <div className="flex gap-2 mb-2">
                                  {colorOptions.map((color) => (
                                    <div 
                                      key={color.value} 
                                      className={`w-6 h-6 rounded-full cursor-pointer  transition-transform border-2 ${selectedColor === color.value ? 'ring-2 ring-offset-1 ring-gray-400' : 'border-gray-200'}`}
                                      style={{ backgroundColor: color.value, borderColor: color.borderColor }}
                                      onClick={() => setSelectedColor(color.value)}
                                    ></div>
                                  ))}
                                </div>
                                
                                <input
                                  type="text"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="w-full py-2 px-3 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none"
                                  maxLength={3000}
                                  autoFocus
                                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                                />
                                
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditSave(task.$id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleEditCancel}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full shadow-md transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="relative ">
                              <h2 className="text-2xl z-50 font-bold text-gray-800 pr-16" 
                                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                                {task.title}
                              </h2>
                              
                              {/* 3-Dot Menu Button */}
                              <div className="absolute z-50 right-0 top-1/2 transform -translate-y-1/2">
                                <button
                                  className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling
                                    const menu = e.currentTarget.nextElementSibling;
                                    menu.classList.toggle('hidden');
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                  </svg>
                                </button>
                            
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 hidden mt-2 w-48 rounded-md shadow-lg bg-white ">
                                  <div className="py-1">
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                      onClick={() => handleEditStart(task)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                      onClick={() => deleteTaskList(task.$id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                          
                          {/* Subtasks */}
                          <div className="px-4">
                            <SubtaskList taskId={task.$id} disabled={task.complete} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ) : null
              )}
            </Swiper>
          </div>

          {/* Desktop View: Grid Layout with dynamic width based on sidebar state */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) =>
              task && task.$id ? (
                <div key={task.$id} className="mx-auto w-full">
                  <div className="rounded-lg  shadow-lg relative overflow-hidden transform transition-transform duration-300"
                       style={{ backgroundColor: task.color || "#FEFCE8" }}>
                    {/* Red margin line on left */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300"></div>
                    
                    {/* Paper holes */}
                    <div className="absolute left-4 top-8 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                    <div className="absolute left-4 top-24 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                    <div className="absolute left-4 top-40 w-2 h-6 bg-gray-100 rounded-full shadow-inner"></div>
                    
                    {/* Content area with blue lines background pattern */}
                    <div className="relative ml-12 py-6" 
                         style={{
                           backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                           backgroundSize: '100% 2rem',
                           backgroundPosition: '0 1rem',
                           backgroundColor: task.color || "#FEFCE8"
                         }}>
                      
                      {/* Task title */}
                      <div className="px-4 mb-4">
                        {editingTaskId === task.$id ? (
                          <div className="flex flex-col space-y-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {colorOptions.map((color) => (
                                <div 
                                  key={color.value} 
                                  className={`w-6 h-6 rounded-full cursor-pointer  transition-transform border-2 ${selectedColor === color.value ? 'ring-2 ring-offset-1 ring-gray-400' : 'border-gray-200'}`}
                                  style={{ backgroundColor: color.value, borderColor: color.borderColor }}
                                  onClick={() => setSelectedColor(color.value)}
                                  title={color.name}
                                ></div>
                              ))}
                            </div>
                            
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full py-2 px-3 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none"
                              maxLength={3000}
                              autoFocus
                              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                            />
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSave(task.$id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full shadow-md transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                          <h2 className="text-2xl font-bold text-gray-800 pr-16" 
                              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                            {task.title}
                          </h2>
                          
                          {/* 3-Dot Menu Button */}
                          <div className="absolute right-0 z-50 top-1/2 transform -translate-y-1/2">
                            <button
                              className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                const menu = e.currentTarget.nextElementSibling;
                                menu.classList.toggle('hidden');
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                        
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 hidden mt-2 w-48 rounded-md shadow-lg bg-white ">
                              <div className="py-1">
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                  onClick={() => handleEditStart(task)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                  onClick={() => deleteTaskList(task.$id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        )}
                      </div>
                      
                      {/* Subtasks */}
                      <div className="px-4">
                        <SubtaskList taskId={task.$id} disabled={task.complete} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-lg">No tasks yet</p>
          <p className="mt-1">Start by adding your first task!</p>
        </div>
      )}
    </div>
  );
}

export default TaskList;