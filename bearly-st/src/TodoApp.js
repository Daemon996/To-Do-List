import React, { useState, useEffect, useRef } from "react";
import "./TodoApp.css";

function TodoApp() {
  // State for the new task input
  const [task, setTask] = useState("");
  // Array to hold task objects
  const [tasks, setTasks] = useState([]);
  // State to hold the current filter ('all', 'active', or 'completed')
  const [filter, setFilter] = useState("all");
  // Ref for the hidden file input (for importing tasks)
  const fileInputRef = useRef(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  // Function to add a new task if the input is not empty
  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now(), // Unique ID based on timestamp
        text: task, // Task text from the input
        completed: false, // Task is not completed by default
        isEditing: false, // Not in editing mode initially
      };
      setTasks([...tasks, newTask]);
      setTask(""); // Clear the input field
    }
  };

  // Handle Enter key press in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Toggle the completed status of a task using its ID
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // Delete a task by filtering it out of the tasks array
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Start editing a task: set isEditing flag and initialize editText with current text
  const startEditing = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, isEditing: true, editText: t.text } : t,
      ),
    );
  };

  // Update the editText value as the user types during editing
  const handleEditChange = (id, newValue) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, editText: newValue } : t)),
    );
  };

  // Save the edited task: update the text and turn off editing mode
  const saveEditedTask = (id) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          // If the edited text is empty, cancel editing (alternatively, alert the user)
          if (t.editText.trim() === "") {
            return { ...t, isEditing: false, editText: undefined };
          }
          return {
            ...t,
            text: t.editText,
            isEditing: false,
            editText: undefined,
          };
        }
        return t;
      }),
    );
  };

  // Cancel editing mode and discard any changes
  const cancelEditing = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, isEditing: false, editText: undefined } : t,
      ),
    );
  };

  // Filter tasks based on the current filter state
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // Export tasks as a JSON file
  const exportTasks = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    // Create a temporary link element and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Trigger file input when "Import Tasks" button is clicked
  const triggerFileInput = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  // Handle file selection and import tasks from a JSON file
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        // Ensure the imported file is an array before updating tasks
        if (Array.isArray(importedTasks)) {
          setTasks(importedTasks);
        } else {
          console.error("Imported file does not contain a valid tasks array.");
        }
      } catch (error) {
        console.error("Error reading imported file:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="todo-container">
      <h1 className="title">To-Do List</h1>

      {/* Input section for adding new tasks */}
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown} // Allows adding task with Enter key
          placeholder="Enter a new task"
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>

      {/* Filter buttons to select which tasks to display */}
      <div className="filter-buttons">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task list */}
      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t.id} className="task-item">
            {t.isEditing ? (
              // Editing mode view for the task
              <div className="edit-container">
                <input
                  type="text"
                  value={t.editText}
                  onChange={(e) => handleEditChange(t.id, e.target.value)}
                  className="edit-input"
                />
                <button
                  onClick={() => saveEditedTask(t.id)}
                  className="save-button"
                >
                  Save
                </button>
                <button
                  onClick={() => cancelEditing(t.id)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Default view for the task (display text and action buttons)
              <>
                <span
                  onClick={() => toggleTask(t.id)}
                  className={`task-text ${t.completed ? "completed" : ""}`}
                >
                  {t.text}
                </span>
                <div className="task-buttons">
                  <button
                    onClick={() => startEditing(t.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Import/Export Buttons Section */}
      <div className="import-export-buttons">
        <button onClick={exportTasks} className="export-button">
          Export Tasks
        </button>
        <button onClick={triggerFileInput} className="import-button">
          Import Tasks
        </button>
        {/* Hidden file input for importing tasks */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".json"
          onChange={handleImport}
        />
      </div>
    </div>
  );
}

export default TodoApp;
