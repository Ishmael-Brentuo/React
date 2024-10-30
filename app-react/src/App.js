import React, { useState, useEffect } from 'react';
import './App.css';
import TodoTask from './componennts/TodoTask';
import TaskSlider from './componennts/TaskSlider';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [currentTask, setCurrentTask] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(0);
  // const [dateNow, setDateNow] = useState(Date.now);

  useEffect(() => {
    const storedTask = localStorage.getItem('tasks');
    if (storedTask) {
      setTasks(JSON.parse(storedTask));
    }
  }, []);

  // function to set input value as task which is setTask

  const handleChange = (event) => {
    event.preventDefault();
    setTask(event.target.value);
  };

  //handle submit function to set or add task to tasks and
  //render ul and li
  const submitTask = () => {
    if (task.trim()) {
      if (isEditing) {
        const updatedTask = [...tasks];
        updatedTask[editTaskIndex] = { text: task, currentTime: fullDate };
        setTasks(updatedTask);
        setIsEditing(false);
        setEditTaskIndex(null);
        localStorage.setItem('tasks', JSON.stringify(updatedTask));
      } else {
        const newTask = { text: task, currentTime: fullDate };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
      }
      setTask('');
    }
  };

  const slider = () => {
    if (tasks.length > 0) {
      const interval = setInterval(() => {
        setCurrentTask((previousId) => (previousId + 1) % tasks.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  };

  useEffect(slider, [tasks]);

  //deleteTask function
  const deleteTask = (taskToDeleteIndex) => {
    const displayTask = tasks.filter((_, index) => index !== taskToDeleteIndex);
    setTasks(displayTask);
    // save task to local storage
    localStorage.setItem('tasks', JSON.stringify(displayTask));
  };

  //editTask function
  const editTask = (taskToEditIndex) => {
    const editTask = tasks[taskToEditIndex];
    setTask(editTask);
    setIsEditing(true);
    setEditTaskIndex(taskToEditIndex);
  };

  //add date to task when sent
  const date = new Date();
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  };
  const fullDate = date.toLocaleString('en-GB', options);
  return (
    <div>
      {/* rendering tasks  */}
      <TodoTask
        task={task}
        tasks={tasks}
        handleChange={handleChange}
        submitTask={submitTask}
        editTask={editTask}
        deleteTask={deleteTask}
        isEditing={isEditing}
        fullDate={fullDate}
      />

      {/* rendering task slider */}
      <TaskSlider tasks={tasks} currentTask={currentTask} slider={slider} />
    </div>
  );
};

export default App;
