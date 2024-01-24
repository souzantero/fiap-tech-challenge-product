import { ProductRepository } from '../../domain/repositories/product-repository';
import { FindProducts } from './find-products';

export class RemoveProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findProducts: FindProducts,
  ) {}

  async removeOneById(id: string): Promise<void> {
    await this.findProducts.findOneById(id);
    return this.productRepository.destroyOneById(id);
  }
}
