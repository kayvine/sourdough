import { Router } from 'express';
import { types } from '../data/item-types';
import { ItemType } from '../../shared/models/item-type';

/**
 * "item" api router specifications
 * => API_URL/api/itemtypes/
 */
export class ItemTypeRoute {
  private api: Router = Router();
  // private itemController: ItemController;

  constructor() {
    // this.itemController = new ItemController();
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
    // this.api.post(
    //   '/',
    //   (req: any, res: any, next: any) => {
    //     const itemtype = req.body;
    //     try {
    //       itemTypeModel
    //         .create(itemtype)
    //         .then(value => {
    //           res.status(201).json({ payload: value });
    //         })
    //         .catch(next);
    //     } catch (error) {
    //       throw new Error(error.message);
    //     }
    //   }
    // );

    this.api.get('/', (req: any, res: any, next: any) => {
      // new Promise(() => types.map(type => type as ItemType))
      //   .then(value => {
      //     console.log(value);
      //     res.status(200).json({ payload: value });
      //   })
      //   .catch(next);
      res.status(200).json({ payload: types });
    });

    // this.api.delete('/:id', (req: any, res: any, next: any) => {
    //   const id = req.params.id;
    //   itemTypeModel
    //     .findByIdAndDelete(id)
    //     .exec()
    //     .then(value => {
    //       res.status(200).json({ payload: value });
    //     })
    //     .catch(next);
    // });
  }
}
