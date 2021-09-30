import React from 'react';
import {Provider} from 'react-redux';
import {AppNavigation} from "./src/Navigation/AppNavigation";
import {store} from './src/redux/store/store';

export default function App() {
  return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
  );
}
