import assert, { strictEqual } from 'node:assert';
import { request } from '../utils/request';

export const shouldCreateANewCustomer = async ({ api = '' }) => {
  const customerData = {
    name: 'Tom Zé',
    email: 'tomze@email.com',
    document: '12345678900',
  };

  const { response, data } = await request(
    `${api}/customers`,
    'POST',
    customerData,
  );

  strictEqual(response.status, 201, 'Response status should be 201');
  assert(data.id, 'Response should contain id');
  strictEqual(data.name, customerData.name, 'Names should match');
  strictEqual(data.email, customerData.email, 'Emails should match');
  strictEqual(data.document, customerData.document, 'Documents should match');
};
