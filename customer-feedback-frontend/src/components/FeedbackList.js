// src/components/RealTimeFeedback.js
import React, { useEffect, useState } from 'react';
import socket from '../socket';

const RealTimeFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    socket.on('newFeedback', (newFeedback) => {
      setFeedback((prevFeedback) => [newFeedback, ...prevFeedback]);
    });

    return () => {
      socket.off('newFeedback');
    };
  }, []);

  return (
    <div>
        
      <h2>Real-Time Feedback</h2>
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeFeedback;
