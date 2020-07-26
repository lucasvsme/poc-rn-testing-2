import Axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { CustomerApiClient, CustomerApiClientImpl } from './api';
import { mockCustomer, mockExistingCustomer, mockCustomers } from './fixtures';

const httpClient: AxiosInstance = Axios.create();
const mock: MockAdapter = new MockAdapter(httpClient);

const client: CustomerApiClient = new CustomerApiClientImpl(httpClient);

beforeEach(() => {
  mock.resetHistory();
});

describe('findAll', () => {
  test('Throwing error when call did not succeed', async () => {
    expect.hasAssertions();

    mock.onGet('/customer').reply(500);

    try {
      await client.findAll();
    } catch (error) {
      expect(error.isAxiosError).toBeTruthy();
      expect(error.response.status).toStrictEqual(500);
      expect(error.message).toStrictEqual(
        'Request failed with status code 500',
      );
      expect(mock.history.get).toHaveLength(1);
    }
  });

  test('Returning array of existing customers', async () => {
    mock.onGet('/customer').reply(200, mockCustomers);

    const customers = await client.findAll();

    expect(customers).toStrictEqual(mockCustomers.customers);
    expect(mock.history.get).toHaveLength(1);
  });
});

describe('create', () => {
  test('Throwing error when call did not succeed', async () => {
    expect.hasAssertions();

    mock.onPost('/customer').reply(500);

    try {
      await client.create(mockCustomer);
    } catch (error) {
      expect(error.isAxiosError).toBeTruthy();
      expect(error.response.status).toStrictEqual(500);
      expect(error.message).toStrictEqual(
        'Request failed with status code 500',
      );
      expect(mock.history.post).toHaveLength(1);
    }
  });

  test('Returning an existing customers', async () => {
    mock.onPost('/customer').reply(200, mockExistingCustomer);

    const existingCustomer = await client.create(mockCustomer);

    expect(existingCustomer).toStrictEqual(mockExistingCustomer);
    expect(mock.history.post).toHaveLength(1);
  });
});

describe('remove', () => {
  test('Throwing error when call did not succeed', async () => {
    expect.hasAssertions();

    mock.onDelete(`/customer/${mockExistingCustomer.id}`).reply(500);

    try {
      await client.remove(mockExistingCustomer.id);
    } catch (error) {
      expect(error.isAxiosError).toBeTruthy();
      expect(error.response.status).toStrictEqual(500);
      expect(error.message).toStrictEqual(
        'Request failed with status code 500',
      );
      expect(mock.history.delete).toHaveLength(1);
    }
  });

  test('Returning an existing customers', async () => {
    mock.onDelete(`/customer/${mockExistingCustomer.id}`).reply(204);

    await client.remove(mockExistingCustomer.id);

    expect(mock.history.delete).toHaveLength(1);
  });
});
