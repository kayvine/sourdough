import express from 'express';

// import log from "./logger/log";
import authRouter from './authentication/authentication.route';
import userRouter from './users/user.route';
// import itemRouter from './items/item.route';
// import itemTypeRouter from './items/item-type.route';

/**
 * Root api router specifications
 * => API_URL/api/
 */
export const apiRoutes = () => {
  const app = express();

  // app.use(cors());

  // app.use(authorisation({ whitelist: ['/authenticate'] }));

  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // jwtStrategy(passport); // require('./passport')(passport);

  // app.use(initialize());
  // app.use(session());

  app.use('/', authRouter);

  app.use('/users', userRouter);
  // app.use('/items', itemRouter);

  // app.use('/itemtypes', itemTypeRouter);

  app.get('/_health', (req, res) => {
    res.status(200).send('OK');
  });

  // Error handler middleware
  // app.use(errorHandling);

  // app.use((error: any, req: any, res: any, next: any) => {
  //   console.error(error);
  //   res.status(error.status || 500);
  //   res.json({
  //     name: error.name || '',
  //     message: error.message,
  //     status: error.status || 500,
  //   });
  //   // log.error(error.toString());
  // });

  return app;
};
