import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product-repository';

export class AddProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async addOne(data: AddOneProductData): Promise<Product> {
    return await this.productRepository.createOne(data);
  }
}

export type AddOneProductData = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
