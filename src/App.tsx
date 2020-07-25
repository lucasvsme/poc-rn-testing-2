import React from 'react';
import Native from 'react-native';

import { CustomersView } from './customers';

export const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <Native.StatusBar />
      <Native.SafeAreaView>
        <CustomersView />
      </Native.SafeAreaView>
    </>
  );
};
