import { App } from './app';
import { environment } from './configuration/environment';
import mongoose from 'mongoose';
import { Repository } from '../core/domain/repositories/repository';
import { ProductMongooseDatabase } from './databases/mongoose/product-mongoose-database';

mongoose.connect(environment.databaseUrl).then(() => {
  const repository: Repository = {
    product: new ProductMongooseDatabase(),
  };

  const app = App.create(repository);
  app.start(environment.port);
});
