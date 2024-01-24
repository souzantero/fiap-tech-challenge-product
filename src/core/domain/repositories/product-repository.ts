import { Product, ProductType } from '../entities/product';

export type CreateOneProductData = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UpdateOneProductData = Partial<CreateOneProductData>;

export interface CreateOneProductRepository {
  createOne(data: CreateOneProductData): Promise<Product>;
}

export interface UpdateOneProductRepository {
  updateOneById(id: string, data: UpdateOneProductData): Promise<Product>;
}

export interface DestroyOneProductRepository {
  destroyOneById(id: string): Promise<void>;
}

export interface FindOneProductRepository {
  findOneById(id: string): Promise<Product | null>;
}

export interface FindManyProductsRepository {
  findManyByIds(ids: string[]): Promise<Product[]>;
  findManyByType(type: ProductType): Promise<Product[]>;
}

export type ProductRepository = CreateOneProductRepository &
  UpdateOneProductRepository &
  DestroyOneProductRepository &
  FindOneProductRepository &
  FindManyProductsRepository;
