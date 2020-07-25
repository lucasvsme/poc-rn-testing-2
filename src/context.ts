import React from 'react';
import Axios from 'axios';

import { CustomerApiClient, CustomerApiClientImpl } from './customers/service';

export type AppContextType = {
  customerApi: CustomerApiClient;
};

export const AppContext = React.createContext<AppContextType>({
  customerApi: new CustomerApiClientImpl(
    Axios.create({
      baseURL: 'http://localhost:8080/',
    }),
  ),
});
