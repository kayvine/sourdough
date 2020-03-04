import { Router } from 'express';
import { ItemController } from './item.controller';

/**
 * "item" api router specifications
 * => API_URL/api/items/
 */
export class ItemRoute {
  private api: Router = Router();
  private itemController: ItemController;

  constructor() {
    this.itemController = new ItemController();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define products routes
   */
  private routes(): void {
    this.api.post(
      '/',
      this.itemController.createItem.bind(this.itemController)
    );

    this.api.get(
      '/',
      this.itemController.getAllItems.bind(this.itemController)
    );

    this.api.get(
      '/:id',
      this.itemController.getItemById.bind(this.itemController)
    );

    this.api.put(
      '/:id',
      this.itemController.updateItem.bind(this.itemController)
    );

    this.api.delete(
      '/:id',
      this.itemController.deleteItem.bind(this.itemController)
    );
  }
}
