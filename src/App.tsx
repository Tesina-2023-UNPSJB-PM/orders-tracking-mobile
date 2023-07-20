/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Provider } from 'react-redux';
import store from './Core/Data/Redux/Store';
import { MainView } from './Core/Presentation/MainView';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <MainView></MainView>
    </Provider>
  );
}

export default App;
