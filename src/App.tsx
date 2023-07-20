/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Provider} from 'react-redux';
import store from './Core/Data/Redux/Store';
import {MainRoutesView} from './Core/Presentation/MainRoutesView';
import {ThemeProvider, createTheme} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#22223B',
    background: '#F2E9E4',
  },
  darkColors: {
    primary: '#22223B',
    background: '#F2E9E4',
  }
});

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainRoutesView></MainRoutesView>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
