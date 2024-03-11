import { Authorizer } from '../../domain/protocols/authorizer';
import {
  ForbiddenError,
  HttpController,
  HttpRequest,
  HttpResponse,
} from '../protocols/http';

export type AuthorizationHttpMiddlewareResponse = {
  customerDocument: string;
};

export class AuthorizationHttpMiddleware
  implements HttpController<AuthorizationHttpMiddlewareResponse>
{
  constructor(private readonly authorizer: Authorizer) {}

  async handle(
    request: HttpRequest,
  ): Promise<HttpResponse<AuthorizationHttpMiddlewareResponse>> {
    const { accessToken } = request;
    if (!accessToken) {
      throw new ForbiddenError('Missing authorization');
    }

    try {
      const customerDocument = await this.authorizer.authorize(accessToken);
      return HttpResponse.ok({ customerDocument });
    } catch (error) {
      throw new ForbiddenError((error as Error).message);
    }
  }
}
