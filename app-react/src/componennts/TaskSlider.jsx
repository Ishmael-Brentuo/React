import React from 'react';

const TaskSlider = ({ tasks, currentTask }) => {
  return (
    <div>
      <div className="slider">
        {tasks.length > 0 ? (
          <div>{tasks[currentTask]}</div>
        ) : (
          <div>No Tasks Available</div>
        )}
      </div>
    </div>
  );
};

export default TaskSlider;
