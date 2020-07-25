import React from 'react';

import { CustomerApiClient } from './service';
import { Customer, ExistingCustomer } from './types';

export function useListFeature(customerApiClient: CustomerApiClient) {
  const [customers, setCustomers] = React.useState<ExistingCustomer[]>([]);
  const [isFetching, setFetching] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>();

  React.useEffect(() => {
    if (isFetching === false) {
      return;
    }

    customerApiClient
      .findAll()
      .then((allCustomers) => {
        setCustomers(allCustomers);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [isFetching, setFetching, setCustomers]);

  const fetch = () => {
    setFetching(true);
  };

  return { customers, fetch, isFetching, error };
}

export function useCreateFeature(customerApiClient: CustomerApiClient) {
  const [customer, setCustomer] = React.useState<Customer>();
  const [isCreating, setCreating] = React.useState<boolean>(false);
  const [customerCreated, setCustomerCreated] = React.useState<
    ExistingCustomer
  >();
  const [error, setError] = React.useState<Error>();

  React.useEffect(() => {
    if (customer === undefined) {
      return;
    }

    setCreating(true);
    customerApiClient
      .create(customer)
      .then((existingCustomer) => {
        setCustomer(undefined);
        setCustomerCreated(existingCustomer);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setCreating(false);
      });
  }, [customer, setCustomer]);

  const create = (customerToCreate: Customer) => {
    setCustomer(customerToCreate);
  };

  return { customerCreated, create, isCreating, error };
}
