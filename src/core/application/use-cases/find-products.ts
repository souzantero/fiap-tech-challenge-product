import { Product, ProductType } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product-repository';

export class FindProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  findManyByType(type: ProductType): Promise<Product[]> {
    return this.productRepository.findManyByType(type);
  }

  async findOneById(id: string): Promise<Product | null> {
    const productById = await this.productRepository.findOneById(id);

    if (!productById) {
      throw new FindOneProductByIdError('Product not found');
    }

    return productById;
  }
}

export class FindOneProductByIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FindOneProductByIdError';
  }
}
