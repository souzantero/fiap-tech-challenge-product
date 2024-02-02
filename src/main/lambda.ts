import serverless from 'serverless-http';
import { App } from './app';
import { PrismaDatabase } from './databases/prisma/prisma-database';

const database = new PrismaDatabase();
const app = App.create(database);

export const handler = serverless(app.express);
