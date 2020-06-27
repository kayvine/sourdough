import express from 'express';
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

  app.use('/', authRouter);

  app.use('/users', userRouter);
  // app.use('/items', itemRouter);

  // app.use('/itemtypes', itemTypeRouter);

  app.get('/_health', (req, res) => {
    res.status(200).send('OK');
  });

  return app;
};
