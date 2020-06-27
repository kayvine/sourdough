import express from 'express';
import authRoutes from './authentication/authentication.route';
import { UserRoute } from './users/user.route';
import { ItemRoute } from './items/item.route';
import { ItemTypeRoute } from './items/item-type.route';

/**
 * Root api router specifications
 * => API_URL/api/
 */
export const apiRoutes = () => {
  const app = express();

  const userRoutes = new UserRoute();
  const itemRoutes = new ItemRoute();
  const itemTypeRoutes = new ItemTypeRoute();

  app.use('/', authRoutes);

  app.use('/users', userRoutes.getApi());
  app.use('/items', itemRoutes.getApi());

  app.use('/itemtypes', itemTypeRoutes.getApi());

  app.get('/_health', (req, res) => {
    res.status(200).send('OK');
  });

  return app;
};
