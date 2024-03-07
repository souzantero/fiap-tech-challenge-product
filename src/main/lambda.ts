import serverless from 'serverless-http';
import { App } from './app';
import mongoose from 'mongoose';
import { environment } from './configuration/environment';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ProductMongooseDatabase } from './databases/mongoose/product-mongoose-database';

const connectMongoose = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(environment.databaseUrl);
  }
};

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  await connectMongoose();
  const repository = {
    product: new ProductMongooseDatabase(),
  };

  const app = App.create(repository);
  return serverless(app.express)(event, context);
};
