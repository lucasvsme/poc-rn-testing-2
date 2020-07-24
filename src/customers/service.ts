import { AxiosInstance, AxiosResponse } from 'axios';
import { Customer, ExistingCustomer } from './types';

type Customers = {
  customers: ExistingCustomer[];
};

export interface CustomerApiClient {
  create(customer: Customer): Promise<ExistingCustomer>;
  findAll(): Promise<ExistingCustomer[]>;
}

export class CustomerApiClientImpl implements CustomerApiClient {
  public constructor(private httpClient: AxiosInstance) {}

  public async create(customer: Customer): Promise<ExistingCustomer> {
    return this.httpClient
      .post<Customer, AxiosResponse<ExistingCustomer>>('/customer', customer)
      .then((response) => response.data);
  }

  public async findAll(): Promise<ExistingCustomer[]> {
    return this.httpClient
      .get<Customers>('/customer')
      .then((response) => response.data.customers);
  }
}
