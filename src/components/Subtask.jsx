import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import appwritetodo from "../appwrite/todo_appwrite";
import { updateSubTask } from "../store/subtaskSlice";

const SubtaskList = ({ taskId }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
     fetchSubtasks();
    }
    
  }, []);

  const fetchSubtasks = async () => {
    try {
      const data = await appwritetodo.getSubTask(taskId);
      setSubtasks(data);
    } catch (error) {
      console.error("Error fetching subtasks:", error);
    }
  };

  // Add Subtask
  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;
console.log('test1')
    const subtask = await appwritetodo.addSubTask(taskId, newSubtask);
    
console.log('after test1')

    // dispatch(createSubTask(subtask));

    setSubtasks([...subtasks, subtask]);
    setNewSubtask("");
  };

  // Delete Subtask
  const handleDeleteSubtask = async (subtaskId) => {
    await appwritetodo.deleteSubTask(subtaskId);
    // dispatch(deleteSubTask(subtaskId));

    setSubtasks(subtasks.filter((sub) => sub.$id !== subtaskId));
  };

  // Start Editing
  const handleEditStart = (subtask) => {
    setEditingSubtaskId(subtask.$id);
    setEditText(subtask.content);
  };

  // Save Edited Subtask
  const handleEditSave = async (subtaskId) => {
    if (!editText.trim()) return;

    await appwritetodo.updateSubTask(subtaskId, editText);
    dispatch(updateSubTask({ subtaskId, content: editText }));

    setSubtasks(
      subtasks.map((sub) =>
        sub.$id === subtaskId ? { ...sub, content: editText } : sub
      )
    );

    setEditingSubtaskId(null);
  };

  // Cancel Edit
  const handleEditCancel = () => {
    setEditingSubtaskId(null);
  };

  // Handle Checkbox Click (UI Only)
  const handleSubtaskClick = (subtask) => {
    if (editingSubtaskId === subtask.$id) return;

    // Update UI state only
    const updatedSubtasks = subtasks.map((sub) =>
      sub.$id === subtask.$id ? { ...sub, complete: !sub.complete } : sub
    );
    setSubtasks(updatedSubtasks);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Notepad container with shadow and paper effect */}
      <div>
        {/* Content area with blue lines background pattern */}
        <div
          className="relative  py-2"
          style={{
            backgroundSize: "100% 2rem",
            backgroundPosition: "0 1rem",
          }}
        >
          {/* Input area with notepad styling */}
          <div className="md:px-4 z-0 mb-6 flex justify-between items-center border-b-2 border-blue-300">
           
<div className="w-auto">
            <input
              type="text"
              className=" py-2  w-3/4 md:w-full bg-transparent focus:border-blue-500 outline-none placeholder-gray-500"
              placeholder="Let's Plan..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  console.log('enter')
                  handleAddSubtask();
                  
                }
              }}
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            />
            <div>
            </div>
            </div>
<div>
            <button
              className="text-gray-500 md:bg-transparent mr-5 py-2 rounded-full hover:text-blue-500 cursor-pointer transition-colors duration-200 w-full"
              onClick={handleAddSubtask}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            </div>
            
          </div>

          {/* Tasks list */}
          {subtasks.length === 0 ? (
            <div
              className="px-4 py-8 text-center text-gray-500 italic h-40"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
             
            </div>
          ) : (
            <ul className="space-y-2  h-40 overflow-y-auto overflow-x-hidden thin-scrollbar">
              {subtasks.map((sub) => (
                <li key={sub.$id} className="group">
                  <div className="flex items-center py-1 hover:bg-gray-50 rounded ">
                    {/* Custom checkbox with pencil mark effect */}
                    <div className="flex-shrink-0 mr-3">
                      <div
                        className={`w-5 h-5 border border-gray-400 rounded cursor-pointer flex items-center justify-center ${
                          sub.complete ? "bg-white" : "bg-white"
                        }`}
                        onClick={() => handleSubtaskClick(sub)}
                      >
                        {sub.complete && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 z-10 w-8 text-gray-600"
                            style={{ transform: "translate(-1px, -1px)" }}
                            viewBox="0 0 15 20"
                            fill="currentColor"
                          >
                            <path
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              opacity="0"
                            />
                            <path className="z-50" d="M13.293 5.293a1 1 0 011.414 0l.5.5a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.5-.5a1 1 0 011.414 0L7 12.586l5.793-5.793a1 1 0 011.414 0z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Task content */}
                    <div 
                      className="flex-grow cursor-pointer" 
                      onClick={() => handleSubtaskClick(sub)}
                    >
                      {editingSubtaskId === sub.$id ? (
                        <input
                          type="text"
                          className="bg-transparent border-b-2 border-blue-300 py-1 w-3/4 outline-none"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditSave(sub.$id);
                            } else if (e.key === "Escape") {
                              handleEditCancel();
                            }
                          }}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                        />
                      ) : (
                        <span
                        className={`max-w-xs break-words whitespace-normal ${
                          sub.complete ? "line-through text-gray-500" : "text-gray-800"
                        }`}
                        style={{
                          fontFamily: "'Comic Sans MS', cursive, sans-serif",
                          wordBreak: "break-word", // Ensures long words break
                          overflowWrap: "break-word", // Helps with breaking words properly
                        }}
                      >
                        {sub.content}
                      </span>
                      
                      )}
                    </div>

                    {/* Action buttons - Always visible */}
                    <div className="flex-shrink-0 flex items-center">
                      {editingSubtaskId === sub.$id ? (
                        /* Edit mode buttons */
                        <div className="flex">
                          <button
                            className="ml-1 p-1 rounded-full bg-green-100 text-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditSave(sub.$id);
                            }}
                            title="Save"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            className="ml-1 p-1 rounded-full bg-gray-100 text-gray-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCancel();
                            }}
                            title="Cancel"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        /* Normal mode buttons - Always visible with subtle styling */
                        <div className="flex">
                          <button
                            className="ml-1 p-1 rounded-full text-gray-300 hover:bg-blue-100 hover:text-blue-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStart(sub);
                            }}
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            className="ml-1 p-1 rounded-full text-gray-300 hover:bg-red-100 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSubtask(sub.$id);
                            }}
                            title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Page number at bottom */}
          <div
            className="mt-8 text-center text-gray-400 italic"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            - {subtasks.length} items -
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtaskList;