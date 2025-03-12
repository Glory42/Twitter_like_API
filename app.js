const express = require('express');
const app = express();
const pool = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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