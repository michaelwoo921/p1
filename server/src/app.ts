import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';
import publicDir from './constant';

import indexRouter from './staticrouter/index';
import usersRouter from './user/user.router';
import trmssRouter from './trms/trms.router';


dotenv.config();
const app = express();

app.use(cors({origin:process.env.CLIENT, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDir));
app.use(session({
  secret: 'whatever',
  store: new (MemoryStore(session))({checkPeriod: 86400000}),
  cookie: {}}));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trmss', trmssRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: Function) {
  
  // render the error page
  res.status(err.status || 500);
  res.sendFile('error.html', { root: publicDir});
});

module.exports = app;
