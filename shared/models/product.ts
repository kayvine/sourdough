import { Item } from './item';

export interface Product extends Item {
  readonly id: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  amount: number;
}
