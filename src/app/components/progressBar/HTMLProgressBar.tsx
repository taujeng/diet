import React from 'react'
import './progressBar.css';

const HTMLProgressBar = ({ value = 0, maxValue = 80, label = 'Protein' }) => {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

  return (
    <div className="progress-container">
      {label} Goal: {value}/{maxValue}g
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          <span className="progress-text">{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};
export default HTMLProgressBar