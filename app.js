const express = require('express');
const app = express();
const pool = require('./config/db');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server);

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);

    socket.join(`user-${socket.userId}`);
    socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`);
    });
});

//routes
const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweets');
const usersRoutes = require('./routes/users');
const feedRoutes = require('./routes/feed');

app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);
app.use('/users', usersRoutes);
app.use('/feed', feedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);

    pool.query('SELECT NOW()', (err) => {
        if (err) console.error('Database connection error:', err);
        else console.log('Database connected');
    })
});