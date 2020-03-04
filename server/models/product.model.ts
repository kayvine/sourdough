import { BaseSchema } from './base.schema';
import Item from './item.model';

// export interface Item extends Document {
//   type: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   category: string[];
//   price: number;
//   amount: number;
// }

const productSchema = new BaseSchema({
  // category: [String],
  price: { type: Number },
  amount: { type: Number }
});

const Product = Item.discriminator('Product', productSchema);

export default Product;
