import { ProductType } from '../../../core/domain/entities/product';
import { PrismaDatabaseError } from './prisma-database';
import { ProductPrismaDatabase } from './product-prisma-database';

describe('ProductPrismaDatabase', () => {
  describe('toModel', () => {
    it('should throw an error if the product type is invalid', () => {
      // Arrange
      const product = {
        type: 'invalid type',
      } as any;
      // Act
      // Assert
      expect(() => ProductPrismaDatabase.toModel(product)).toThrow(
        new PrismaDatabaseError(`Invalid product type: ${product.type}`),
      );
    });

    it('should return a product model', () => {
      // Arrange
      const product = {
        id: 'id',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        type: 'DRINK',
        name: 'name',
        description: 'description',
        price: 1,
      } as any;
      // Act
      const result = ProductPrismaDatabase.toModel(product);
      // Assert
      expect(result).toEqual(product);
    });
  });

  describe('createOne', () => {
    it('should create a product', async () => {
      // Arrange
      const data = {
        type: 'DRINK',
        name: 'name',
        description: 'description',
        price: 1,
      } as any;
      const prisma = {
        product: {
          create: jest.fn().mockResolvedValue(data),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      const result = await database.createOne(data);
      // Assert
      expect(result).toEqual(data);
      expect(prisma.product.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('updateOneById', () => {
    it('should update a product', async () => {
      // Arrange
      const id = 'id';
      const data = {
        type: 'DRINK',
        name: 'name',
        description: 'description',
        price: 1,
      } as any;
      const prisma = {
        product: {
          update: jest.fn().mockResolvedValue(data),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      const result = await database.updateOneById(id, data);
      // Assert
      expect(result).toEqual(data);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id },
        data,
      });
    });
  });

  describe('destroyOneById', () => {
    it('should destroy a product', async () => {
      // Arrange
      const id = 'id';
      const prisma = {
        product: {
          delete: jest.fn(),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      await database.destroyOneById(id);
      // Assert
      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('findOneById', () => {
    it('should return a product', async () => {
      // Arrange
      const id = 'id';
      const product = {
        id,
        type: 'DRINK',
        name: 'name',
        description: 'description',
        price: 1,
      } as any;
      const prisma = {
        product: {
          findUnique: jest.fn().mockResolvedValue(product),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      const result = await database.findOneById(id);
      // Assert
      expect(result).toEqual(product);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if the product does not exist', async () => {
      // Arrange
      const id = 'id';
      const prisma = {
        product: {
          findUnique: jest.fn().mockResolvedValue(null),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      const result = await database.findOneById(id);
      // Assert
      expect(result).toBeNull();
      expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('findManyByIds', () => {
    it('should return a list of products', async () => {
      // Arrange
      const ids = ['id'];
      const products = [
        {
          id: ids[0],
          type: 'DRINK',
          name: 'name',
          description: 'description',
          price: 1,
        },
      ] as any;
      const prisma = {
        product: {
          findMany: jest.fn().mockResolvedValue(products),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      const result = await database.findManyByIds(ids);
      // Assert
      expect(result).toEqual(products);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { id: { in: ids } },
      });
    });
  });

  describe('findManyByType', () => {
    it('should return a list of products', async () => {
      // Arrange
      const type = ProductType.Drink;
      const products = [
        {
          id: 'id',
          type,
          name: 'name',
          description: 'description',
          price: 1,
        },
      ] as any;
      const prisma = {
        product: {
          findMany: jest.fn().mockResolvedValue(products),
        },
      } as any;
      const database = new ProductPrismaDatabase(prisma);
      // Act
      const result = await database.findManyByType(type);
      // Assert
      expect(result).toEqual(products);
      expect(prisma.product.findMany).toHaveBeenCalledWith({ where: { type } });
    });
  });
});
