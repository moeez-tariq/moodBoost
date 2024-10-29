// src/MoodContent.js
import React from 'react';

// AI helped me divide this into a different file

const MoodContent = ({ content }) => { // mood content component
  return (
    <div className="mood-content">
      <p>{content}</p>
    </div>
  );
};

export default MoodContent; // export the mood content component