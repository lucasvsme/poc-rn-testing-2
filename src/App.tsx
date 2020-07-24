import React from 'react';
import Native from 'react-native';
import Axios from 'axios';

import { CustomersView, CustomerApiClientImpl } from './customers';

export const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <Native.StatusBar />
      <Native.SafeAreaView>
        <CustomersView
          client={
            new CustomerApiClientImpl(
              Axios.create({
                baseURL: 'http://localhost:8080',
              }),
            )
          }
        />
      </Native.SafeAreaView>
    </>
  );
};
