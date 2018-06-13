import { all } from 'redux-saga/effects';
import charts from './modules/charts/sagas';

export default function* rootSaga() {
  yield all([
    charts,
  ]);
}
