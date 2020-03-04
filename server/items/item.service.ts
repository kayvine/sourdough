import { ItemDao } from './item.dao';
import { Document } from 'mongoose';

export class ItemService {
  private itemDao: ItemDao;

  constructor(itemDao: ItemDao = new ItemDao()) {
    this.itemDao = itemDao;
  }

  public createItem(item) {
    try {
      return this.itemDao.createItem(item);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public findAllByType(type: string) {
    // if (type === null) {
    //   return this.itemDao.findAll();
    // } else {
    return this.itemDao.findAllByType(type);
    // }
  }

  public findById(id: string) {
    try {
      return this.itemDao.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public updateItem(id: string, item: Document) {
    return this.itemDao.updateItem(id, item);
  }

  public deleteItem(id: string) {
    return this.itemDao.deleteItem(id);
  }
}
