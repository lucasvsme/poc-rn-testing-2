import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface AppStyle {
  wrapper: ViewStyle;
  title: TextStyle;
}

const App: React.FC = (): React.ReactElement => {
  const style: StyleSheet.NamedStyles<AppStyle> = StyleSheet.create({
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
          <View style={style.wrapper}>
            <Text style={style.title}>React Native</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
