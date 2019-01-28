import { createStore, applyMiddleware, compose } from 'redux';
import MQTT from 'async-mqtt';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { takeLatest, fork, all } from 'redux-saga/effects';

export const mqtt = MQTT.connect(`ws://${process.env.REACT_APP_MQTT_HOST}`);

export const SUBSCRIBE_TOPIC = 'HAM/SUBSCRIBE_TOPIC';
export const ADD_MESSAGE = 'HAM/ADD_MESSAGE';

const initialState = fromJS({
  topics: {},
});

function reducer(state = initialState, action) {
  const actions = {
    [SUBSCRIBE_TOPIC]: ({ name }) =>
      state.setIn(['topics', name], fromJS({})),
    [ADD_MESSAGE]: ({ topic, message }) =>
      state.getIn(['topics', topic])
        ? state.mergeIn(['topics', topic], fromJS({ [new Date()]: message }))
        : state,
  }
  return actions[action.type] ? actions[action.type](action) : state;
};

export const subscribeTopic = name => ({
  type: SUBSCRIBE_TOPIC,
  name,
});

export const addMessage = (topic, message) => ({
  type: ADD_MESSAGE,
  topic,
  message,
});

export const history = createBrowserHistory();

export const container = state => state;

export const makeSelectLastTopicMessageByName = nameGetter => createSelector(
  container,
  (_state, props) => nameGetter(props),
  (state, name) => {
    const msg = state.getIn(['topics', name]);
    return msg && msg.valueSeq().size > 0 ? msg.last() : null;
  }
);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  routerMiddleware(history),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

function* mqttSubscribeTopic({ name }) {
  try {
    yield mqtt.subscribe(name);
  } catch (e) {
    console.log('error', e);
  }
}

const collectedSagas = [
  function* () {
    yield takeLatest(SUBSCRIBE_TOPIC, mqttSubscribeTopic);
  },
];

function* sagas() {
  const sagasForks = collectedSagas.map(saga => fork(saga));

  yield all([...sagasForks]);
}

sagaMiddleware.run(sagas);

mqtt.on('message', (topic, message) => {
  store.dispatch(addMessage(topic, message.toString()))
})

export default store;