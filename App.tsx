import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Todo from './Todo';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Todo />
    </GestureHandlerRootView>
  );
}
