export type EnvironmentName = 'development' | 'production';

export interface Environment {
  readonly name: EnvironmentName;
  readonly port: number;
  readonly databaseUrl: string;
  readonly authorizationUrl: string;
}

if (process.env.NODE_ENV) {
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'production'
  ) {
    throw new Error('NODE_ENV must be "development" or "production"');
  }
}

if (process.env.PORT) {
  const port = Number(process.env.PORT);
  if (Number.isNaN(port)) {
    throw new Error('PORT must be a number');
  }
}

export const environment: Environment = {
  name: (process.env.NODE_ENV as EnvironmentName) || 'development',
  port: Number(process.env.PORT) || 3000,
  databaseUrl:
    process.env.DATABASE_URL ||
    'mongodb://root:mongopass@localhost:27017/productdb?authSource=admin',
  authorizationUrl:
    process.env.AUTHORIZATION_URL ?? 'http://localhost:3004/api',
};
