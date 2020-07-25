import * as TestingLibrary from '@testing-library/react-hooks';

import { useListFeature, useCreateFeature } from './hooks';

import {
  mockCustomer,
  mockExistingCustomer,
  mockCustomerApiClient,
  mockCustomerApiClientFindAll,
  mockCustomerApiClientFindAllError,
  mockCustomerApiClientCreate,
  mockCustomerApiClientCreateError,
} from './fixtures';

describe('useListFeature', () => {
  test('Retrieving all existing customers', async () => {
    const hook = TestingLibrary.renderHook(() =>
      useListFeature({
        ...mockCustomerApiClient,
        findAll: mockCustomerApiClientFindAll,
      }),
    );

    await TestingLibrary.act(async () => {
      expect(hook.result.current.isFetching).toBeFalsy();
      return hook.result.current.fetch();
    });

    await hook.waitForValueToChange(async () => {
      return hook.result.current.customers;
    });

    expect(hook.result.current.error).toBeUndefined();
    expect(hook.result.current.isFetching).toBeFalsy();
    expect(hook.result.current.customers).toStrictEqual([mockExistingCustomer]);
    expect(mockCustomerApiClientFindAll).toHaveBeenCalled();
  });

  test('Setting error object when the HTTP request failed', async () => {
    const hook = TestingLibrary.renderHook(() =>
      useListFeature({
        ...mockCustomerApiClient,
        findAll: mockCustomerApiClientFindAllError,
      }),
    );

    await TestingLibrary.act(async () => {
      expect(hook.result.current.isFetching).toBeFalsy();
      return hook.result.current.fetch();
    });

    await hook.waitForValueToChange(async () => {
      return hook.result.current.error;
    });

    expect(hook.result.current.error).toStrictEqual(Error('findAll'));
    expect(hook.result.current.isFetching).toBeFalsy();
    expect(hook.result.current.customers).toStrictEqual([]);
    expect(mockCustomerApiClientFindAllError).toHaveBeenCalled();
  });
});

describe('useCreateFeature', () => {
  test('Creating a new customer', async () => {
    const hook = TestingLibrary.renderHook(() =>
      useCreateFeature({
        ...mockCustomerApiClient,
        create: mockCustomerApiClientCreate,
      }),
    );

    await TestingLibrary.act(async () => {
      return hook.result.current.create(mockCustomer);
    });

    await hook.waitForValueToChange(async () => {
      return hook.result.current.customerCreated;
    });

    expect(hook.result.current.error).toBeUndefined();
    expect(hook.result.current.isCreating).toBeFalsy();
    expect(hook.result.current.customerCreated).toStrictEqual(
      mockExistingCustomer,
    );
    expect(mockCustomerApiClientCreate).toHaveBeenCalled();
  });

  test('Setting error object when the HTTP request failed', async () => {
    const hook = TestingLibrary.renderHook(() =>
      useCreateFeature({
        ...mockCustomerApiClient,
        create: mockCustomerApiClientCreateError,
      }),
    );

    await TestingLibrary.act(async () => {
      return hook.result.current.create(mockCustomer);
    });

    await hook.waitForValueToChange(async () => {
      return hook.result.current.error;
    });

    expect(hook.result.current.error).toStrictEqual(Error('create'));
    expect(hook.result.current.isCreating).toBeFalsy();
    expect(hook.result.current.customerCreated).toBeUndefined();
    expect(mockCustomerApiClientCreateError).toHaveBeenCalled();
  });
});
