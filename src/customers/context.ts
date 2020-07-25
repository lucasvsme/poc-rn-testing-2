import React from 'react';
import Axios from 'axios';

import { CustomerApiClient, CustomerApiClientImpl } from './service';

export type CustomerContextType = {
  client: CustomerApiClient;
};

export const CustomerContext = React.createContext<CustomerContextType>({
  client: new CustomerApiClientImpl(
    Axios.create({
      baseURL: 'http://localhost:8080/',
    }),
  ),
});
