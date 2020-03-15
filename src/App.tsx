import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

const App: React.FC = (): React.ReactElement => {
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <ScrollView></ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
