/* 
  file is entry point of the application
*/

require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models/db.js');
const reviewRouter = require('./routers/reviewRouter.js');
const UsersRouter = require('./routers/apiRouter.js');
const app = express();

// PORT
const PORT = 3000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded()); //added this
app.use(cookieParser());

// static elements
app.use('/client', express.static(path.join(__dirname, '/dist')));

// api calls
app.use('/api/user', UsersRouter);
app.use('/api/review', reviewRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

// Port
db.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
});
