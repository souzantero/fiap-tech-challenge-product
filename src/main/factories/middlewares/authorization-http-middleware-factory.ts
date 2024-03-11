import { AuthorizationHttpMiddleware } from '../../../core/presentation/middlewares/authorization-http-middleware';
import { AuthenticationFetchProvider } from '../../providers/authorization-fetch-provider';
import { environment } from '../../configuration/environment';

export const makeAuthorizationHttpMiddleware =
  (): AuthorizationHttpMiddleware => {
    const authorizer = new AuthenticationFetchProvider(
      environment.authorizationUrl,
    );
    return new AuthorizationHttpMiddleware(authorizer);
  };
