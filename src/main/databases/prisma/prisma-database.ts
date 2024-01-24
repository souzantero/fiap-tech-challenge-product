import { PrismaClient } from '@prisma/client';
import { ProductPrismaDatabase } from './product-prisma-database';
import { Repository } from '../../../core/domain/repositories/repository';

export class PrismaDatabaseError extends Error {
  constructor(message: string) {
    super(`[PrismaDatabase]: ${message}`);
    this.name = 'PrismaDatabaseError';
  }
}

export class PrismaDatabase implements Repository {
  private readonly prisma: PrismaClient = new PrismaClient();
  public readonly product = new ProductPrismaDatabase(this.prisma);

  connect(): Promise<void> {
    return this.prisma.$connect();
  }

  disconnect(): Promise<void> {
    return this.prisma.$disconnect();
  }

  async drop(): Promise<void> {
    await Promise.all([
      this.prisma.product.deleteMany(),
    ]);
  }
}
