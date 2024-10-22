const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
