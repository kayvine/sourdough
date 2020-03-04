import * as express from 'express';
import * as cors from 'cors';
import authorisation from '../middleware/authorisation';
import { initialize, session } from 'passport';
import jwtStrategy from '../middleware/passport';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorisation({ whitelist: ['/authenticate'] }));

// jwtStrategy(passport); // require('./passport')(passport);

// app.use(initialize());
// app.use(session());

export default app;
