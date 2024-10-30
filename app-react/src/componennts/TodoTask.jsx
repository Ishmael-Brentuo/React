import React from 'react';
import { Edit, Delete } from '@mui/icons-material';

const TodoTask = ({
  task,
  tasks,
  handleChange,
  submitTask,
  editTask,
  deleteTask,
  isEditing,
  fullDate,
}) => {
  return (
    <div>
      <div className="container">
        {/* task list render container */}
        <div className="taskContainer">
          <h1>Your To Do Task For Today</h1>
          <hr />

          {tasks.map((task, index) => (
            <div key={index} className="task">
              <div className="taskAndDate">
                <div>{task} </div>
                <div className="dateOnTask">{fullDate}</div>
              </div>
              <div className="containerIcons">
                <Edit onClick={() => editTask(index)} />
                <Delete onClick={() => deleteTask(index)} />
              </div>
            </div>
          ))}
        </div>

        {/* adding task or input container */}
        <div className="inputContainer">
          <input
            type="text"
            className="input"
            value={task}
            onChange={handleChange}
          />

          <button className="addTaskButton" onClick={submitTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoTask;
