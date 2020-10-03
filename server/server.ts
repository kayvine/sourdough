import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import environment from './config/environment';
// import log from "./logger/log";
import { authorisation } from './middleware/authorisation';
import { apiRoutes } from './index';
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(`unable to connect to database: ${environment.MONGO_DATABASE}`);
    console.log(error);
  }

  mongoose.connection.on('error', (err) => {
    console.error(err);
  });
})();

const app = express();

app.use(cors());

app.use(authorisation({ whitelist: ['/api/auth'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jwtStrategy(passport); // require('./passport')(passport);

// app.use(initialize());
// app.use(session());

app.use('/api', apiRoutes());

// Error handler middleware
app.use((req, res) => {
  res.status(404).json;
});

app.use((error: any, req: any, res: any, next: any) => {
  console.error(error);
  res.status(error.status || 500).json({
    name: error.name || '',
    message: error.message,
    status: error.status || 500,
  });
  // logger.error(error.toString());
});

/**
 * Start application server
 */
app.listen(environment.PORT, () => {
  console.log(`Started on http://${environment.API_URL}:${environment.PORT}`);
});
