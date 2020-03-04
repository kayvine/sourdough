import { Model, Document } from 'mongoose';
import { DataNotFoundException } from '../exceptions/datanotfound.exception';
import Item from '../models/item.model';
import Product from '../models/product.model';
import Article from '../models/article.model';

/**
 * Item data access functions
 */
export class ItemDao {
  /**
   * Create new Item
   * @param item : Item Interface
   */
  public async createItem(item: any) {
    const TypeModel = this.getType(item.type);
    // console.log(TypeModel.modelName.toString());
    const x = await TypeModel.create(item);
    return x.toObject();
  }

  private getType(type: string): Model<Document, {}> {
    console.log('getType' + type);
    return {
      ['products']: Product,
      ['articles']: Article,
      ['stores']: Item
    }[type];
  }

  /**
   * Find all items
   * @exception DataNotFoundException if no data in "items" collection
   * @return a promise with all items (containing the document _id)
   */
  // public findAll() {
  //   return Item.find()
  //     .exec()
  //     .then(value => {
  //       if (value === null) {
  //         throw new DataNotFoundException('- no items');
  //       }
  //       return value;
  //     });
  // }

  /**
   * Find all items by type
   * @exception DataNotFoundException if no data in "items" collection
   * @return a promise with all items (containing the document _id)
   */
  public async findAllByType(type: string): Promise<any> {
    console.log('Find items of type', type);
    const query = !type ? Item.find({}) : Item.find({ type: type });
    const value = await query.exec();
    if (value === null) {
      throw new DataNotFoundException('- no items');
    }
    return value.map(x => x.toObject());
  }

  public async findById(id: string) {
    const x = await Item.findById(id).exec();
    return x.toObject();
  }

  public updateItem(id: string, item: any) {
    return Item.findByIdAndUpdate(id, item).exec();
  }

  public deleteItem(id: string) {
    return Item.findByIdAndDelete(id).exec();
  }
}
