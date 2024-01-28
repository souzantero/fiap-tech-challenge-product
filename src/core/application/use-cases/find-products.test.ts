import { ProductInMemoryDatabase } from '../../../main/databases/in-memory/product-in-memory-database';
import { FindProducts } from './find-products';

describe('FindProducts', () => {
  describe('findManyByIds', () => {
    it('should be empty', async () => {
      const productRepository = new ProductInMemoryDatabase();
      const findProducts = new FindProducts(productRepository);
      const products = await findProducts.findManyByIds([]);
      expect(products).toHaveLength(0);
    });
  });
});
