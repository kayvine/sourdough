import * as mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import environment from './config/environment';
// import log from "./logger/log";
import authorisation from './middleware/authorisation';
import { errorHandling } from './middleware/error-handling';
import { apiRoutes } from './index';
require('dotenv').config();

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));
mongoose.connection
  .on('error', () => {
    console.log(`unable to connect to database: ${environment.MONGO_DATABASE}`);
  })
  .once('open', () => console.log('MongoDB connected...'));

const app = express();

app.use(cors());

app.use(authorisation({ whitelist: ['/authenticate'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jwtStrategy(passport); // require('./passport')(passport);

// app.use(initialize());
// app.use(session());

app.use('/api', apiRoutes);

// Error handler middleware
app.use(errorHandling);

app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500);
  res.json({
    name: error.name || '',
    message: error.message,
    status: error.status || 500,
  });
  // log.error(error.toString());
  console.error(error);
});

/**
 * Start application server
 */
app.listen(environment.PORT, () => {
  console.log(`Started on http://${environment.API_URL}:${environment.PORT}`);
});
