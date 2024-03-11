import { FindOneProductByIdError } from '../../application/use-cases';
import { ProductType } from '../../domain/entities/product';
import { BadRequestError } from '../protocols/http';
import {
  AddOneProductHttpController,
  FindManyProductsHttpController,
  RemoveOneProductHttpController,
  UpdateOneProductHttpController,
  parsePrice,
  parseProductType,
} from './product-http-controller';

describe('parsePrice', () => {
  it('should parse a string to number', () => {
    const price = parsePrice('10.00');
    expect(price).toBe(10);
  });

  it('should throw a bad request error if price is invalid', () => {
    expect(() => parsePrice('invalid')).toThrow(
      new BadRequestError('Invalid price'),
    );
  });
});

describe('parseProductType', () => {
  it('should parse a string to ProductType', () => {
    const type = parseProductType('DRINK');
    expect(type).toBe(ProductType.Drink);
  });

  it('should throw a bad request error if type is invalid', () => {
    expect(() => parseProductType('INVALID')).toThrow(
      new BadRequestError('Invalid product type'),
    );
  });
});

describe('AddOneProductHttpController', () => {
  describe('handle', () => {
    it('should add a product', async () => {
      // Arrange
      const addedProduct = {
        id: '1',
        name: 'Coca-Cola',
        description: 'Coca-Cola 350ml',
        price: 5,
        type: ProductType.Drink,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const addProduct = {
        addOne: jest.fn().mockResolvedValue(addedProduct),
      } as any;

      const addOneProductHttpController = new AddOneProductHttpController(
        addProduct,
      );

      // Act
      const response = await addOneProductHttpController.handle({
        body: {
          name: 'Coca-Cola',
          description: 'Coca-Cola 350ml',
          price: '5',
          type: 'DRINK',
        },
      } as any);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toBe(addedProduct);
    });

    it('should throw a bad request error if body is invalid', async () => {
      // Arrange
      const addProduct = {
        addOne: jest.fn(),
      } as any;

      const addOneProductHttpController = new AddOneProductHttpController(
        addProduct,
      );

      // Act
      const addOne = addOneProductHttpController.handle({
        body: {},
      } as any);

      // Assert
      await expect(addOne).rejects.toThrow(
        new BadRequestError('Missing required fields'),
      );
    });
  });
});

describe('UpdateOneProductHttpController', () => {
  describe('handle', () => {
    it('should update a product', async () => {
      // Arrange
      const updatedProduct = {
        id: '1',
        name: 'Coca-Cola',
        description: 'Coca-Cola 350ml',
        price: 5,
        type: ProductType.Drink,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const updateProduct = {
        updateOneById: jest.fn().mockResolvedValue(updatedProduct),
      } as any;

      const updateOneProductHttpController = new UpdateOneProductHttpController(
        updateProduct,
      );

      // Act
      const response = await updateOneProductHttpController.handle({
        params: {
          id: '1',
        },
        body: {
          name: 'Coca-Cola',
        },
      } as any);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBe(updatedProduct);
    });

    it('should throw a bad request error if body is invalid', async () => {
      // Arrange
      const updateProduct = {
        updateOneById: jest.fn(),
      } as any;

      const updateOneProductHttpController = new UpdateOneProductHttpController(
        updateProduct,
      );

      // Act
      const updateOne = updateOneProductHttpController.handle({
        params: {
          id: '1',
        },
        body: {},
      } as any);

      // Assert
      await expect(updateOne).rejects.toThrow(
        new BadRequestError('Missing required fields'),
      );
    });

    it('should throw a bad request error if update product throw a FindOneProductByIdError', async () => {
      // Arrange
      const updateProduct = {
        updateOneById: jest
          .fn()
          .mockRejectedValue(new FindOneProductByIdError('Product not found')),
      } as any;

      const updateOneProductHttpController = new UpdateOneProductHttpController(
        updateProduct,
      );

      // Act
      const updateOne = updateOneProductHttpController.handle({
        params: {
          id: '1',
        },
        body: {
          name: 'Coca-Cola',
        },
      } as any);

      // Assert
      await expect(updateOne).rejects.toThrow(
        new BadRequestError('Product not found'),
      );
    });

    it('should throw error if update product throw an error', async () => {
      // Arrange
      const updateProduct = {
        updateOneById: jest
          .fn()
          .mockRejectedValue(new Error('Unexpected error')),
      } as any;

      const updateOneProductHttpController = new UpdateOneProductHttpController(
        updateProduct,
      );

      // Act
      const updateOne = updateOneProductHttpController.handle({
        params: {
          id: '1',
        },
        body: {
          name: 'Coca-Cola',
        },
      } as any);

      // Assert
      await expect(updateOne).rejects.toThrow(new Error('Unexpected error'));
    });
  });
});

describe('RemoveOneProductHttpController', () => {
  describe('handle', () => {
    it('should remove a product', async () => {
      // Arrange
      const removeProduct = {
        removeOneById: jest.fn(),
      } as any;

      const removeOneProductHttpController = new RemoveOneProductHttpController(
        removeProduct,
      );

      // Act
      const response = await removeOneProductHttpController.handle({
        params: {
          id: '1',
        },
      } as any);

      // Assert
      expect(response.status).toBe(204);
    });

    it('should throw a bad request error if remove product throw a FindOneProductByIdError', async () => {
      // Arrange
      const removeProduct = {
        removeOneById: jest
          .fn()
          .mockRejectedValue(new FindOneProductByIdError('Product not found')),
      } as any;

      const removeOneProductHttpController = new RemoveOneProductHttpController(
        removeProduct,
      );

      // Act
      const removeOne = removeOneProductHttpController.handle({
        params: {
          id: '1',
        },
      } as any);

      // Assert
      await expect(removeOne).rejects.toThrow(
        new BadRequestError('Product not found'),
      );
    });

    it('should throw error if remove product throw an error', async () => {
      // Arrange
      const removeProduct = {
        removeOneById: jest
          .fn()
          .mockRejectedValue(new Error('Unexpected error')),
      } as any;

      const removeOneProductHttpController = new RemoveOneProductHttpController(
        removeProduct,
      );

      // Act
      const removeOne = removeOneProductHttpController.handle({
        params: {
          id: '1',
        },
      } as any);

      // Assert
      await expect(removeOne).rejects.toThrow(new Error('Unexpected error'));
    });
  });
});

describe('FindManyProductsHttpController', () => {
  describe('handle', () => {
    it('should find many products by type', async () => {
      // Arrange
      const products = [
        {
          id: '1',
          name: 'Coca-Cola',
          description: 'Coca-Cola 350ml',
          price: 5,
          type: ProductType.Drink,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const findProducts = {
        findManyByType: jest.fn().mockResolvedValue(products),
      } as any;

      const findManyProductsHttpController = new FindManyProductsHttpController(
        findProducts,
      );

      // Act
      const response = await findManyProductsHttpController.handle({
        query: {
          type: 'DRINK',
        },
      } as any);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBe(products);
    });

    it('should throw a bad request error if query type is undefined', async () => {
      // Arrange
      const findProducts = {
        findMany: jest.fn(),
      } as any;

      const findManyProductsHttpController = new FindManyProductsHttpController(
        findProducts,
      );

      // Act
      const findMany = findManyProductsHttpController.handle({
        query: {},
      } as any);

      // Assert
      await expect(findMany).rejects.toThrow(
        new BadRequestError('Missing required fields'),
      );
    });

    it('should find many products by ids', async () => {
      // Arrange
      const products = [
        {
          id: '1',
          name: 'Coca-Cola',
          description: 'Coca-Cola 350ml',
          price: 5,
          type: ProductType.Drink,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const findProducts = {
        findManyByIds: jest.fn().mockResolvedValue(products),
      } as any;

      const findManyProductsHttpController = new FindManyProductsHttpController(
        findProducts,
      );

      // Act
      const response = await findManyProductsHttpController.handle({
        query: {
          ids: '1',
        },
      } as any);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBe(products);
    });
  });
});
