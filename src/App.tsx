import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { CustomersView } from './Customer';

const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <CustomersView />
      </SafeAreaView>
    </>
  );
};

export default App;
