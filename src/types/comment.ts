import { Host } from './host';

export type Comment = {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}
