import mongoose, { Schema } from 'mongoose';
import { Product, ProductType } from '../../../core/domain/entities/product';
import {
  CreateOneProductData,
  ProductRepository,
} from '../../../core/domain/repositories/product-repository';

const ProductSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const toEntity = (product: any): Product => ({
  id: product._id.toString(),
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
  deletedAt: product.deletedAt,
  type: product.type,
  name: product.name,
  description: product.description,
  price: product.price,
});

export class ProductMongooseDatabase implements ProductRepository {
  async createOne(data: CreateOneProductData): Promise<Product> {
    const product = new ProductModel(data);
    await product.save();
    return toEntity(product);
  }

  async updateOneById(
    id: string,
    data: Partial<CreateOneProductData>,
  ): Promise<Product> {
    await ProductModel.updateOne({ _id: id }, data);
    const product = await ProductModel.findById(id);
    return toEntity(product);
  }

  async destroyOneById(id: string): Promise<void> {
    await ProductModel.updateOne({ _id: id }, { deletedAt: new Date() });
  }

  async findOneById(id: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ _id: id, deletedAt: null });
    if (!product) return null;
    return toEntity(product);
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    const products = await ProductModel.find({
      _id: { $in: ids },
      deletedAt: null,
    });
    return products.map(toEntity);
  }

  async findManyByType(type: ProductType): Promise<Product[]> {
    const products = await ProductModel.find({ type, deletedAt: null });
    return products.map(toEntity);
  }
}
