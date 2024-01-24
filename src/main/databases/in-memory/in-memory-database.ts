import { Repository } from '../../../core/domain/repositories/repository';
import { ProductInMemoryDatabase } from './product-in-memory-database';

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export class InMemoryDatabase implements Repository {
  public readonly product = new ProductInMemoryDatabase();
}
