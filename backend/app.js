var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
var cors = require('cors')


var authRouter = require('./routes/authRouter');
var postsRouter = require('./routes/tasksRouter');
const { pageNotFound } = require('./controllers/errorController');

var app = express();

app.use(cors())

//database setup


async function main() {
  await mongoose.connect(process.env.DB_URI);
}
main()
.then(console.log("Database Connected"))
.catch(err => console.log(err));

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users/', authRouter);
app.use('/api/tasks/', postsRouter);

app.use('/*',pageNotFound);

app.listen(5000,()=>{
  console.log("Server listening on port 5000")
})

module.exports = app;
