import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SwipeableViews from 'react-swipeable-views';

import 'react-circular-progressbar/dist/styles.css';
import './App.css';

import StartScreen from 'views/StartScreen';
import Player from 'views/Player';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwipeableViews enableMouseEvents>
          <StartScreen />
          <Player />
        </SwipeableViews>
      </Provider>
    );
  }
}

export default App;
