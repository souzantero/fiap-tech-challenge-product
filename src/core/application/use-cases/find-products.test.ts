import { ProductType } from '../../domain/entities/product';
import { FindOneProductByIdError, FindProducts } from './find-products';

describe('FindProducts', () => {
  describe('findManyByIds', () => {
    it('should be empty', async () => {
      const productRepository = {
        findManyByIds: jest.fn().mockResolvedValue([]),
      } as any;
      const findProducts = new FindProducts(productRepository);
      const products = await findProducts.findManyByIds([]);
      expect(products).toHaveLength(0);
    });

    it('should return products', async () => {
      const productRepository = {
        findManyByIds: jest.fn().mockResolvedValue([
          {
            id: '1',
            type: 'drink',
            name: 'Coca-Cola',
            description: 'Coca-Cola 350ml',
            price: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ]),
      } as any;
      const findProducts = new FindProducts(productRepository);
      const products = await findProducts.findManyByIds(['1']);
      expect(products).toHaveLength(1);
    });
  });

  describe('findManyByType', () => {
    it('should return products', async () => {
      const productRepository = {
        findManyByType: jest.fn().mockResolvedValue([
          {
            id: '1',
            type: 'drink',
            name: 'Coca-Cola',
            description: 'Coca-Cola 350ml',
            price: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ]),
      } as any;
      const findProducts = new FindProducts(productRepository);
      const products = await findProducts.findManyByType(ProductType.Drink);
      expect(products).toHaveLength(1);
    });
  });

  describe('findOneById', () => {
    it('should return a product', async () => {
      // Arrange
      const productFound = {
        id: '1',
        type: 'drink',
        name: 'Coca-Cola',
        description: 'Coca-Cola 350ml',
        price: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const productRepository = {
        findOneById: jest.fn().mockResolvedValue(productFound),
      } as any;

      const findProducts = new FindProducts(productRepository);

      // Act
      const product = await findProducts.findOneById('1');

      // Assert
      expect(product).toBe(productFound);
    });

    it('should throw an error if product is null', async () => {
      // Arrange
      const productRepository = {
        findOneById: jest.fn().mockResolvedValue(null),
      } as any;

      const findProducts = new FindProducts(productRepository);

      // Act
      const findOneById = findProducts.findOneById('1');

      // Assert
      await expect(findOneById).rejects.toThrow(
        new FindOneProductByIdError('Product not found'),
      );
    });
  });
});
