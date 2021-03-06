require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { isFirstElement } = require('./views/helpers/isFirstElement');

const indexRouter = require('./routes/indexRouter');
const orderRouter = require('./routes/orderRoute');

const app = express();
const { PORT } = process.env || 3000;

// view engine setup
app.set('views', path.join(process.env.PWD, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));
hbs.registerHelper('isFirstElement', isFirstElement);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use('/', indexRouter);
app.use('/orders', orderRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});

module.exports = app;
