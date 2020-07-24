export type Customer = {
  name: string;
  age: number;
};

export type ExistingCustomer = Customer & {
  id: string;
};
