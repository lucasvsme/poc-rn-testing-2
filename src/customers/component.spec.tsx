import React from 'react';
import * as TestingLibrary from 'react-native-testing-library';

import { CustomerContext } from './context';
import { CustomersList, CustomerCreate } from './component';

import {
  mockCustomer,
  mockCustomerApiClient,
  mockCustomerApiClientFindAll,
  mockCustomerApiClientCreate,
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
  test('Customer name is required', async () => {
    const component = TestingLibrary.render(
      <CustomerContext.Provider
        value={{
          client: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </CustomerContext.Provider>,
    );

    const input = await component.findByTestId('customer-create-input-name');
    TestingLibrary.fireEvent.changeText(input, undefined);

    const button = await component.findByTestId('customer-create-button');
    TestingLibrary.fireEvent.press(button);

    expect(mockCustomerApiClientCreate).not.toHaveBeenCalled();
  });

  test('Customer age is required', async () => {
    const component = TestingLibrary.render(
      <CustomerContext.Provider
        value={{
          client: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </CustomerContext.Provider>,
    );

    const name = await component.findByTestId('customer-create-input-name');
    TestingLibrary.fireEvent.changeText(name, mockCustomer.name);

    const age = await component.findByTestId('customer-create-input-age');
    TestingLibrary.fireEvent.changeText(age, undefined);

    const button = await component.findByTestId('customer-create-button');
    TestingLibrary.fireEvent.press(button);

    expect(mockCustomerApiClientCreate).not.toHaveBeenCalled();
  });

  test('Customer age must be a number', async () => {
    const component = TestingLibrary.render(
      <CustomerContext.Provider
        value={{
          client: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </CustomerContext.Provider>,
    );

    const name = await component.findByTestId('customer-create-input-name');
    TestingLibrary.fireEvent.changeText(name, mockCustomer.name);

    const age = await component.findByTestId('customer-create-input-age');
    TestingLibrary.fireEvent.changeText(age, '4five');

    const button = await component.findByTestId('customer-create-button');
    TestingLibrary.fireEvent.press(button);

    expect(mockCustomerApiClientCreate).not.toHaveBeenCalled();
  });

  test('Creating a customer and clearing fields', async () => {
    const component = TestingLibrary.render(
      <CustomerContext.Provider
        value={{
          client: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </CustomerContext.Provider>,
    );

    const name = await component.findByTestId('customer-create-input-name');
    TestingLibrary.fireEvent.changeText(name, mockCustomer.name);

    const age = await component.findByTestId('customer-create-input-age');
    TestingLibrary.fireEvent.changeText(age, mockCustomer.age.toString());

    await TestingLibrary.act(async () => {
      const button = await component.findByTestId('customer-create-button');
      TestingLibrary.fireEvent.press(button);
    });

    expect(mockCustomerApiClientCreate).toHaveBeenCalled();
  });
});