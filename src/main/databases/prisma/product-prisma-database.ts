import { PrismaClient, Product as ProductPrismaEntity } from '@prisma/client';
import {
  CreateOneProductData,
  ProductRepository,
} from '../../../core/domain/repositories/product-repository';
import { Product, ProductType } from '../../../core/domain/entities/product';
import { PrismaDatabaseError } from './prisma-database';

export class ProductPrismaDatabase implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  static toModel(product: ProductPrismaEntity): Product {
    const type = Object.values(ProductType).find(
      (type) => type === product.type,
    );
    if (!type)
      throw new PrismaDatabaseError(`Invalid product type: ${product.type}`);

    return {
      id: product.id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
      type,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }

  async createOne(data: CreateOneProductData): Promise<Product> {
    const product = await this.prisma.product.create({ data });
    return ProductPrismaDatabase.toModel(product);
  }

  async updateOneById(
    id: string,
    data: Partial<CreateOneProductData>,
  ): Promise<Product> {
    const product = await this.prisma.product.update({ where: { id }, data });
    return ProductPrismaDatabase.toModel(product);
  }

  async destroyOneById(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async findOneById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? ProductPrismaDatabase.toModel(product) : null;
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    });
    return products.map(ProductPrismaDatabase.toModel);
  }

  async findManyByType(type: ProductType): Promise<Product[]> {
    const products = await this.prisma.product.findMany({ where: { type } });
    return products.map(ProductPrismaDatabase.toModel);
  }
}
