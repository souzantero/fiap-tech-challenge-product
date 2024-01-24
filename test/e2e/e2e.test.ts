import { after, before, beforeEach, describe, it } from 'node:test';
import { Server } from 'node:http';
import { AddressInfo } from 'node:net';

import { App } from '../../src/main/app';
import { PrismaDatabase } from '../../src/main/databases/prisma/prisma-database';
import { shouldCreateANewCustomer } from './asserts/customer-asserts';

const database = new PrismaDatabase();
const app = App.create(database);

describe('e2e', () => {
  let server: Server;
  let api: string;

  before(async () => {
    await database.connect();
    server = app.start(0);
    const port = (server.address() as AddressInfo).port;
    api = `http://localhost:${port}/api`;
  });

  beforeEach(async () => {
    await database.drop();
  });

  after(async () => {
    await database.disconnect();
    server.close();
  });

  describe('POST /customers', () => {
    it('should create a new customer', () => shouldCreateANewCustomer({ api }));
  });
});
