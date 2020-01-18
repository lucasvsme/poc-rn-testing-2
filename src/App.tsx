import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: React.FC = (): React.ReactElement => {
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
    },
  });

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.wrapper}>
            <Text style={styles.title}>React Native</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
