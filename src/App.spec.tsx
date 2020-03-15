import { ScrollView } from 'react-native';
import React from 'react';
import App from './App';

import ReactRenderer, {
  ReactTestRenderer,
  ReactTestInstance,
} from 'react-test-renderer';

test('It renders the text', () => {
  const renderer: ReactTestRenderer = ReactRenderer.create(<App />);

  const node: ReactTestInstance = renderer.root.findByType(ScrollView);

  expect(node).toBeDefined();
});
