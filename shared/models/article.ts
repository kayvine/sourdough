export interface Article {
  readonly id?: string;
  title: string;
  subtitle?: string;
  description: string;
  images?: string[];
  publishedBy: string;
  publishedOn: Date;
}
