import { App } from './app';
import { PrismaDatabase } from './databases/prisma/prisma-database';
import { environment } from './configuration/environment';

const app = App.create(new PrismaDatabase());
app.start(environment.port);
