import { useState } from 'react';
import './App.css';

// Task Class to handle individual task logic
class Task {
  constructor(name) {
    this.name = name;
    this.status = false; // false means not completed, true means completed
  }

  toggleStatus() {
    this.status = !this.status;
  }
}

function App() {
  const [tasks, setTasks] = useState([]);

  const saveToDoList = (event) => {
    const toname = event.target.toname.value.trim();

    // Check if task already exists in a case-insensitive and trimmed manner
    if (tasks.some(task => task.name.toLowerCase() === toname.toLowerCase())) {
      alert("Todo name already exists!");
      return;
    }

    // Create new task and add to state
    const newTask = new Task(toname);
    setTasks([...tasks, newTask]);
    event.target.reset(); // Reset the input field
    event.preventDefault();
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = tasks.slice();
    updatedTasks[index].toggleStatus();
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="input">
         <form onSubmit={saveToDoList}>
        <input type="text" name="toname" />
        <button className='button'>Save</button>
        </form>
      </div>
      <div className="OuterDiv">
        <ul>
          {tasks.map((task, index) => (
            <ToDoListItem
              key={index}
              task={task}
              index={index}
              toggleTaskStatus={toggleTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ToDoListItem({ task, index, toggleTaskStatus, deleteTask }) {
  return (
    <li
      className={task.status ? 'completetodo' : ''}
      onClick={() => toggleTaskStatus(index)}
    >
      {index + 1}. {task.name}{' '}
      <span onClick={(e) => {
        e.stopPropagation(); // Prevent triggering toggleStatus
        deleteTask(index);
      }}>&times;</span>
    </li>
  );
}

export default App;
