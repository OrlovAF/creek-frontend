import { combineReducers } from 'redux';

export const LOAD_METRICS = 'LOAD_METRICS';

export const loadMetricsRequest = (params) => ({
  type: `${LOAD_METRICS}_REQUEST`,
  payload: params,
});

export const loadMetricsSuccess = (metrics) => ({
  type: `${LOAD_METRICS}_SUCCESS`,
  payload: metrics,
});

export const loadMetricsFailed = (error) => ({
  type: `${LOAD_METRICS}_FAILED`,
  payload: error,
});

const entities = (state = {charts: {watino: [], weka: []}}, action) => {
  switch (action.type) {
    case `${LOAD_METRICS}_SUCCESS`: {
      return {...state, charts: action.payload};
    }

    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case `${LOAD_METRICS}_REQUEST`: {
      return null;
    }

    case  `${LOAD_METRICS}_FAILED`: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default combineReducers({
  error,
  entities,
});
