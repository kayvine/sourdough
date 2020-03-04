import { NextFunction, Request, Response, Router } from 'express';
import { ItemService } from './item.service';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  public createItem(req: Request, res: Response, next: NextFunction) {
    const item = req.body;
    this.itemService
      .createItem(item)
      .then(value => {
        res.status(201).json({ payload: value });
      })
      .catch(next);
  }

  public getAllItems(req: Request, res: Response, next: NextFunction) {
    const type = req.query.type;

    this.itemService
      .findAllByType(type)
      .then(value => {
        res.status(200).json({ payload: value });
      })
      .catch(next);
  }

  public getItemById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    this.itemService
      .findById(id)
      .then(value => {
        res.status(200).json({ payload: value });
      })
      .catch(next);
  }

  // If an existing resource is modified, either the 200 (OK) or 204 (No Content) response codes >
  // SHOULD be sent to indicate successful completion of the request.
  public updateItem(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const item = req.body;
    this.itemService
      .updateItem(id, item)
      .then(value => {
        // console.log(value.toJSON());
        res.status(200).json({ payload: value });
      })
      .catch(next);
  }

  // A successful response SHOULD be 200 (OK) if the response includes an entity describing the
  // status, 202 (Accepted) if the action has not yet been enacted, or 204 (No Content) if the action
  // has been enacted but the response does not include an entity.
  public deleteItem(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    this.itemService
      .deleteItem(id)
      .then(() => {
        console.log('deleting...');
        // console.log(value.toJSON());
        res.status(204);
        // res.status(204);
      })
      .catch(next);
  }
}
