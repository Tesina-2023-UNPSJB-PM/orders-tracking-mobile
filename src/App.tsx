/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import { Dialog, ThemeProvider, createTheme } from '@rneui/themed';
import { Provider } from 'react-redux';
import store from './Core/Data/Redux/Store';
import { MainRoutesView } from './Core/Presentation/MainRoutesView';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';

const theme = createTheme({
  lightColors: {
    primary: '#4A4E69',
    secondary: '#22223B',
    background: '#F2E9E4',
  },
  darkColors: {
    primary: '#4A4E69',
    secondary: '#22223B',
    background: '#F2E9E4',
  },
  mode: 'light',
});

function App(): React.JSX.Element {
  dayjs.extend(utc);
  const [spinner, setSpinner] = useState(false);

  axios.interceptors.request.use(function (config) {
    setSpinner(true);
    return config;
  });

  axios.interceptors.response.use(
    function (response) {
      setSpinner(false);
      return response;
    },
    function (error) {
      setSpinner(false);
      return Promise.reject(error);
    },
  );
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Dialog isVisible={spinner}>
          <Dialog.Loading />
        </Dialog>
        <MainRoutesView></MainRoutesView>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
