import { model } from 'mongoose';
import { BaseSchema } from './base.schema';

// export interface Item extends Document {
//   title: string;
//   subtitle?: string;
//   description: string;
// }

const itemSchema = new BaseSchema({
  type: { type: String },
  title: { type: String },
  subtitle: { type: String, required: false },
  description: { type: String }
});

const Item = model('Item', itemSchema);

export default Item;
