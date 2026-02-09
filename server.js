const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bookRoutes = require('./routes/bookRouter');
const publisherRoutes = require('./routes/publisherRouter');
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const orderRoutes = require('./routes/orderRouter');
const { errorLogger } = require('./middleware/errorLogger');

app.use(express.json());

console.log('Starting server...');
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('JWT Secret exists:', !!process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB");
    console.error("Error:", err.message);
    console.error("Connection string:", process.env.MONGODB_URI);
  });

app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/publishers', publisherRoutes);
app.use('/orders', orderRoutes);

app.use('/frontend', express.static('frontend'));

app.use(errorLogger);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Main page http://127.0.0.1:3000/frontend/main.html");
  console.log("Dashboard http://127.0.0.1:3000/frontend/index.html");
  console.log("Login/SignUp http://127.0.0.1:3000/frontend/auth.html");
});
