// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import React from 'react';
import * as TestingLibrary from 'react-native-testing-library';

import { AppContext } from '../context';

import { CustomersList, CustomerCreate, CustomersView } from './components';
import {
  mockCustomer,
  mockCustomerApiClient,
  mockCustomerApiClientFindAll,
  mockCustomerApiClientFindAllOnSecondCall,
  mockCustomerApiClientCreate,
  mockCustomerApiClientRemove,
} from './fixtures';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CustomersList', () => {
  test('Rendering list on first render', async () => {
    const component = TestingLibrary.render(
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            findAll: mockCustomerApiClientFindAll,
          },
        }}>
        <CustomersList />
      </AppContext.Provider>,
    );

    await TestingLibrary.act(async () => {
      // "Waiting" for the first render
    });

    const items = component.queryAllByTestId('customers-list-list-item');
    expect(items).toHaveLength(1);
    expect(mockCustomerApiClientFindAll).toHaveBeenCalledTimes(1);
  });

  test('Calling Customer service on list item press', async () => {
    const component = TestingLibrary.render(
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            findAll: mockCustomerApiClientFindAll,
            remove: mockCustomerApiClientRemove,
          },
        }}>
        <CustomersList />
      </AppContext.Provider>,
    );

    await TestingLibrary.act(async () => {
      // "Waiting" for the first render
    });

    await TestingLibrary.waitFor(() => {
      return expect(
        component.getByTestId('customers-list-list-item'),
      ).toBeTruthy();
    });

    await TestingLibrary.act(async () => {
      const item = await component.findByTestId(
        'customers-list-list-item-wrapper',
      );
      TestingLibrary.fireEvent.press(item);
    });

    expect(mockCustomerApiClientRemove).toHaveBeenCalledTimes(1);
  });
});

describe('CustomerCreate', () => {
  test('Customer name is required', async () => {
    const component = TestingLibrary.render(
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </AppContext.Provider>,
    );

    const input = await component.findByTestId('customer-create-input-name');
    TestingLibrary.fireEvent.changeText(input, undefined);

    const button = await component.findByTestId('customer-create-button');
    TestingLibrary.fireEvent.press(button);

    expect(mockCustomerApiClientCreate).not.toHaveBeenCalled();
  });

  test('Customer age is required', async () => {
    const component = TestingLibrary.render(
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </AppContext.Provider>,
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
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </AppContext.Provider>,
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
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
          },
        }}>
        <CustomerCreate />
      </AppContext.Provider>,
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

describe('CustomersView', () => {
  test('Updating list after customer creation', async () => {
    const component = TestingLibrary.render(
      <AppContext.Provider
        value={{
          customerApi: {
            ...mockCustomerApiClient,
            create: mockCustomerApiClientCreate,
            findAll: mockCustomerApiClientFindAllOnSecondCall,
          },
        }}>
        <CustomersView />
      </AppContext.Provider>,
    );

    const name = await component.findByTestId('customer-create-input-name');
    TestingLibrary.fireEvent.changeText(name, mockCustomer.name);

    const age = await component.findByTestId('customer-create-input-age');
    TestingLibrary.fireEvent.changeText(age, mockCustomer.age.toString());

    await TestingLibrary.act(async () => {
      const button = await component.findByTestId('customer-create-button');
      TestingLibrary.fireEvent.press(button);
    });

    await TestingLibrary.waitFor(() => {
      return expect(
        component.getByTestId('customers-list-list-item'),
      ).toBeTruthy();
    });

    const items = component.getAllByTestId('customers-list-list-item');

    expect(items).toHaveLength(1);
    expect(mockCustomerApiClientFindAllOnSecondCall).toHaveBeenCalledTimes(2);
  });
});
