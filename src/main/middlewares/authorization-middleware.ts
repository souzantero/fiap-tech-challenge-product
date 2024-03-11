import { adaptMiddleware } from '../adapters/express-adapter';
import { makeAuthorizationHttpMiddleware } from '../factories/middlewares/authorization-http-middleware-factory';

export const authorization = adaptMiddleware(makeAuthorizationHttpMiddleware());
