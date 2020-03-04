import env from './environment';
import * as mongoose from 'mongoose';

const mongoUri = `${process.env.MONGO_URI}`;

mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
  .on('error', () => {
    throw new Error(`unable to connect to database: ${env.MONGO_DATABASE}`);
  })
  .once('open', () => console.log('MongoDB connected...'));
