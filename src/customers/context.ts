import React from 'react';

import { ExistingCustomer } from './types';

export type CustomerContextType = {
  existingCustomers: ExistingCustomer[];
  setExistingCustomers(existingCustomers: ExistingCustomer[]): void;

  latestCustomer?: ExistingCustomer;
  setLatestCustomer(latestCustomer?: ExistingCustomer): void;
};

export const CustomerContext = React.createContext<CustomerContextType>({
  existingCustomers: [],
  setExistingCustomers(existingCustomers) {
    this.existingCustomers = existingCustomers;
  },

  latestCustomer: undefined,
  setLatestCustomer(latestCustomer) {
    this.latestCustomer = latestCustomer;
  },
});
