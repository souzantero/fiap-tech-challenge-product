import { Product } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product-repository';
import { AddOneProductData } from './add-product';
import { FindProducts } from './find-products';

export class UpdateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly findProducts: FindProducts,
  ) {}

  async updateOneById(
    id: string,
    data: UpdateOneProductData,
  ): Promise<Product> {
    await this.findProducts.findOneById(id);
    return this.productRepository.updateOneById(id, data);
  }
}

export type UpdateOneProductData = Partial<AddOneProductData>;
