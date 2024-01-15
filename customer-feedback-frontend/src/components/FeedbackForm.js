import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

const FeedbackForm = ({ productId }) => {
  const [rating, setRating] = useState(5);  // Initial rating
  const [comment, setComment] = useState('');
  const socket = socketIOClient('http://localhost:3001');  // Change the URL based on your backend server

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Send feedback data to your backend
    const feedbackData = { productId, rating, comment };
    socket.emit('feedback', feedbackData);

    // Clear the form after submission
    setRating(5);
    setComment('');
  };

  return (
    <div>
      <h3>Feedback Form</h3>
      <div>
        <label>Rating: </label>
        <input type="number" min="1" max="10" value={rating} onChange={handleRatingChange} />
      </div>
      <div>
        <label>Comment: </label>
        <textarea value={comment} onChange={handleCommentChange} />
      </div>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;
