import { Router } from 'express';
import { UserRoute } from '../users/user.route';
import { AuthRoute } from '../authentication/authentication.route';
import { ItemRoute } from '../items/item.route';
import { ItemTypeRoute } from '../items/item-type.route';

/**
 * Root api router specifications
 * => API_URL/api/
 */
export class IndexRoute {
  private api: Router = Router();
  private authRoute: AuthRoute;
  private userRoute: UserRoute;
  private itemRoute: ItemRoute;
  private itemTypeRoute: ItemTypeRoute;
  // private productRoute: ProductRoute;

  constructor() {
    // this.productRoute = new ProductRoute();
    this.authRoute = new AuthRoute();
    this.userRoute = new UserRoute();
    this.itemRoute = new ItemRoute();
    this.itemTypeRoute = new ItemTypeRoute();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define index routes
   */
  private routes(): void {
    this.api.use('/', this.authRoute.getApi());

    this.api.use('/users', this.userRoute.getApi());
    this.api.use('/items', this.itemRoute.getApi());

    this.api.use('/itemtypes', this.itemTypeRoute.getApi());

    this.api.get('/_health', (req, res) => {
      res.status(200).send('OK');
    });
  }
}
