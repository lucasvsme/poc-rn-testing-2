import 'react-native';
import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  renderer.create(<App />);
});
