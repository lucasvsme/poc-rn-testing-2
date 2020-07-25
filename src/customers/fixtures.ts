import { Customers } from './service';
import { Customer, ExistingCustomer } from './types';

export const mockCustomer: Customer = {
  name: 'John Smith',
  age: 35,
};

export const mockExistingCustomer: ExistingCustomer = {
  ...mockCustomer,
  id: 'fb80e922-ce1c-11ea-be2b-0f3b177252ed',
};

export const mockCustomers: Customers = {
  customers: [mockExistingCustomer],
};
