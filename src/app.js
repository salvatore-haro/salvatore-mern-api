const express = require("express");
var cors = require('cors');
require('dotenv').config()
require('./db');
const { checkJwt } = require('./middlewares/auth.middleware');

const docRoutes = require('./routes/doc.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');

const app = express();

app.use(cors())
app.use(express.json());
app.use(checkJwt);

app.use('/', docRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
