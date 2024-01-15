// // feedback-portal-backend/src/routes/feedbackRoutes.js

// const express = require('express');
// const router = express.Router();
// const Feedback = require('../models/feedbackModel');

// // Route to get all feedback
// router.get('/feedback', async (req, res) => {
//   try {
//     const feedback = await Feedback.find();
//     res.json(feedback);
//   } catch (error) {
//     console.error('Error fetching feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to get a specific feedback by ID
// router.get('/feedback/:id', async (req, res) => {
//   try {
//     const feedback = await Feedback.findById(req.params.id);
//     if (!feedback) {
//       return res.status(404).json({ error: 'Feedback not found' });
//     }
//     res.json(feedback);
//   } catch (error) {
//     console.error('Error fetching feedback by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to submit feedback
// router.post('/submitFeedback', async (req, res) => {
//   try {
//     const { customerName, rating, feedbackMessage } = req.body;

//     const feedback = new Feedback({
//       customerName,
//       rating,
//       feedbackMessage,
//     });

//     const savedFeedback = await feedback.save();
//     res.json(savedFeedback);
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Add more routes as needed

// module.exports = router;
