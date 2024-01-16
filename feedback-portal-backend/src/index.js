// feedback-portal-backend/src/index.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const Feedback = require('./models/feedbackModel');
const Product = require('./models/productModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/feedback_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('MongoDB connection error:', error));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});

// Socket.io setup
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    socket.on('newComment', (comment) => {
      io.emit('comment', comment);
    });
  });
  
// feedback-portal-backend/src/index.js
app.post('/submitFeedback', async (req, res) => {
    try {
      const { customerName, rating, feedbackMessage, productId } = req.body;
  
      const feedback = new Feedback({
        customerName,
        rating,
        feedbackMessage,
        product: productId, 
      });
  
      const savedFeedback = await feedback.save();
  
      await Product.findByIdAndUpdate(productId, { $push: { feedbacks: savedFeedback._id } });
  
      io.emit('feedback', {
        id: savedFeedback._id,
        username: 'User',
        message: savedFeedback.feedbackMessage,
        createdAt: savedFeedback.createdAt,
      });
  
      res.json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  });
  
// Route to get all products with feedbacks
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find().populate('feedbacks');
      const productData = products.map(product => {
        return {
          _id: product._id,
          name: product.name,
          imageUrl: product.imageUrl,
          description: product.description,
          feedbacks: product.feedbacks.map(feedback => ({
            _id: feedback._id,
            customerName: feedback.customerName,
            customerId: feedback.customerId,
            rating: feedback.rating,
            feedbackMessage: feedback.feedbackMessage,
          })),
        };
      });
      res.json(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });
  
  
  app.get('/feedbacks/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const feedbacks = await Feedback.find({ product: productId });
      res.json(feedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
  });
  
  
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  const SECRET_KEY = 'your_secret_key'; // Replace with a secure secret key
  
  app.post('/addproducts', async (req, res) => {
    try {
      const { name, imageUrl, description } = req.body;
  
      const product = new Product({
        name,
        imageUrl,
        description,
      });
  
      const savedProduct = await product.save();
  
      res.json(savedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  app.delete('/deleteFeedback', async (req, res) => {
    const { commentId } = req.body;
  
    try {
      await Feedback.findByIdAndDelete(commentId);
  
      res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({ error: 'Failed to delete feedback' });
    }
  });
  

  // Signup
  app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/profile', (req, res) => {

  res.json({ message: 'Profile page. Authorized access!' });
});
