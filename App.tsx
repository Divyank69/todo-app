import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import Todo from './src/screens/TodoScreen/todoscreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <Todo />
      </RootSiblingParent>

    </GestureHandlerRootView>
  );
}
