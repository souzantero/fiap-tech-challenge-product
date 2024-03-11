import { Authorizer } from '../../core/domain/protocols/authorizer';

export class AuthenticationFetchProvider implements Authorizer {
  constructor(private readonly url: string) {}
  async authorize(accessToken: string): Promise<string> {
    const response = await fetch(`${this.url}/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    return data.message;
  }
}
