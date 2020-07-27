import React from 'react';

import { CustomerApiClient } from './api';
import { Customer, ExistingCustomer } from './types';

export function useRemoveFeature(customerApiClient: CustomerApiClient) {
  const [isRemoving, setRemoving] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>();
  const [customerId, setCustomerId] = React.useState<string>();

  React.useEffect(() => {
    if (isRemoving === false) {
      return;
    }

    customerApiClient
      .remove(customerId!)
      .then(() => {
        setCustomerId(undefined);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setRemoving(false);
      });
  }, [isRemoving, setRemoving, setError, setCustomerId]);

  const remove = (customerId: string) => {
    setCustomerId(customerId);
    setRemoving(true);
  };

  return { remove, isRemoving, error, customerId };
}

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

export function useCustomerValidation(customer: Partial<Customer>) {
  const [isValid, setValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (customer.name === undefined) {
      setValid(false);
      return;
    }

    const age = Number(customer.age);
    if (Number.isNaN(age)) {
      setValid(false);
      return;
    }

    if (!Number.isInteger(age)) {
      setValid(false);
      return;
    }

    setValid(true);
  }, [customer.name, customer.age]);

  return { isValid };
}
