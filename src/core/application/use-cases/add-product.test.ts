import { ProductInMemoryDatabase } from '../../../main/databases/in-memory/product-in-memory-database';
import { ProductType } from '../../domain/entities/product';
import { AddProduct } from './add-product';

const randomString = (length = 10) =>
  Math.random().toString(36).substring(length);
const randomInt = (min = 0, max = 100) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

describe('AddProduct', () => {
  it('should add a product', async () => {
    // Arrange
    const productRepository = new ProductInMemoryDatabase();
    const addProduct = new AddProduct(productRepository);
    const data = {
      type: ProductType.Drink,
      name: randomString(),
      description: randomString(),
      price: randomInt(),
    };

    // Act
    const product = await addProduct.addOne(data);

    // Assert
    expect(product).toHaveProperty('id');
  });
});
