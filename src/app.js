const express = require('express');
const helmet = require('helmet');

const userRouter = require('./routes/user.route')
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/users', userRouter);
app.use(errorHandler);

module.exports = app;
