import { BaseSchema } from './base.schema';
import Item from './item.model';

// export interface Article extends Document {
//   title: string;
//   subtitle?: string;
//   description: string;
//   images?: string[];
//   isPublished: Boolean;
//   publishedBy: string;
//   publishedOn: Date;
// }

const articleSchema = new BaseSchema({
  images: [{ name: String, url: String }],
  isPublished: Boolean,
  publishedBy: { type: String },
  publishedOn: { type: Date }
});

const Article = Item.discriminator('Article', articleSchema);

export default Article;
