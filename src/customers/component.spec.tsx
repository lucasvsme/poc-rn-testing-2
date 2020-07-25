import React from 'react';
import * as TestingLibrary from 'react-native-testing-library';

import { CustomerContext } from './context';
import { CustomersList } from './component';

import {
  mockCustomerApiClient,
  mockCustomerApiClientFindAll,
} from './fixtures';

describe('CustomersList', () => {
  test('Rendering empty list by default', async () => {
    const component = TestingLibrary.render(
      <CustomerContext.Provider
        value={{
          client: {
            ...mockCustomerApiClient,
            findAll: mockCustomerApiClientFindAll,
          },
        }}>
        <CustomersList />
      </CustomerContext.Provider>,
    );

    const items = component.queryAllByTestId('customers-list-list-item');

    expect(items).toHaveLength(0);
    expect(mockCustomerApiClientFindAll).not.toHaveBeenCalled();
  });

  test('Calling Customer service on button press', async () => {
    const component = TestingLibrary.render(
      <CustomerContext.Provider
        value={{
          client: {
            ...mockCustomerApiClient,
            findAll: mockCustomerApiClientFindAll,
          },
        }}>
        <CustomersList />
      </CustomerContext.Provider>,
    );

    const button = await component.findByTestId('customers-list-button');
    TestingLibrary.fireEvent.press(button);

    await TestingLibrary.waitFor(() => {
      return expect(
        component.getByTestId('customers-list-list-item'),
      ).toBeTruthy();
    });

    const items = component.getAllByTestId('customers-list-list-item');
    expect(items).toHaveLength(1);
    expect(mockCustomerApiClientFindAll).toHaveBeenCalled();
  });
});

describe('CustomerCreate', () => {
  test.todo('Customer name is required');
  test.todo('Customer age is required');
  test.todo('Customer age must be a number');
  test.todo('Creating a customer and clearing fields');
});
