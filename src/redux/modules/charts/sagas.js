import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as types from './reducer';
import * as actions from './reducer';
import ChartService from '../../../services/chart.service';

function * LoadCharts({payload}) {
  try {
    const [weka , watino] = yield all([
      call([ChartService, ChartService.getWeka],
        payload,
      ),

      call([ChartService, ChartService.getWatino],
        payload,
      )
    ]);

    yield put(actions.loadMetricsSuccess({weka, watino}));
  } catch (error) {
    yield put(actions.loadMetricsFailed(error));
  }
}


const userRootSaga = all([
  takeEvery(`${types.LOAD_METRICS}_REQUEST`, LoadCharts),
]);

export default userRootSaga;
