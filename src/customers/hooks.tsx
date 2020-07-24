import React from 'react';

import { CustomerApiClient } from './service';
import { Customer, ExistingCustomer } from './types';

export function useCustomersList(customerApiClient: CustomerApiClient) {
  const [customers, setCustomers] = React.useState<ExistingCustomer[]>([]);
  const [isFetching, setFetching] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isFetching === false) {
      return;
    }

    customerApiClient.findAll().then((allCustomers) => {
      setCustomers(allCustomers);
      setFetching(false);
      console.debug('Customers list updated');
    });
  }, [isFetching, setFetching, setCustomers]);

  const fetch = () => {
    setFetching(true);
  };

  return { customers, fetch, isFetching };
}

export function useCreateCustomer(customerApiClient: CustomerApiClient) {
  const [customer, setCustomer] = React.useState<Customer>();
  const [isCreating, setCreating] = React.useState<boolean>(false);
  const [existingCustomer, setExistingCustomer] = React.useState<
    ExistingCustomer
  >();

  React.useEffect(() => {
    if (customer === undefined) {
      return;
    }

    setCreating(true);
    customerApiClient.create(customer).then((existingCustomer) => {
      setCreating(false);
      setCustomer(undefined);
      setExistingCustomer(existingCustomer);
      console.debug('Customer created');
    });
  }, [customer, setCustomer]);

  const create = (customerToCreate: Customer) => {
    setCustomer(customerToCreate);
  };

  return { existingCustomer, create, isCreating };
}
