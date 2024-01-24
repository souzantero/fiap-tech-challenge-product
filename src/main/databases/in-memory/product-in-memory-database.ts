import { Product, ProductType } from '../../../core/domain/entities/product';
import {
  CreateOneProductData,
  CreateOneProductRepository,
  DestroyOneProductRepository,
  FindManyProductsRepository,
  FindOneProductRepository,
  UpdateOneProductData,
  UpdateOneProductRepository,
} from '../../../core/domain/repositories/product-repository';
import { generateId } from './in-memory-database';

export class ProductInMemoryDatabase
  implements
    CreateOneProductRepository,
    UpdateOneProductRepository,
    DestroyOneProductRepository,
    FindOneProductRepository,
    FindManyProductsRepository
{
  private readonly products: Product[] = [];

  async createOne(data: CreateOneProductData): Promise<Product> {
    const now = new Date();
    const product = {
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      type: data.type,
      name: data.name,
      description: data.description,
      price: data.price,
    };

    this.products.push(product);

    return product;
  }

  async updateOneById(
    id: string,
    data: UpdateOneProductData,
  ): Promise<Product> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    const updatedProduct = {
      ...product,
      ...data,
      updatedAt: new Date(),
    };

    this.products.splice(this.products.indexOf(product), 1, updatedProduct);

    return updatedProduct;
  }

  async destroyOneById(id: string): Promise<void> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    this.products.splice(this.products.indexOf(product), 1);
  }

  async findOneById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    return this.products.filter((product) => ids.includes(product.id));
  }

  async findManyByType(type: ProductType): Promise<Product[]> {
    return this.products.filter((product) => product.type === type);
  }
}
