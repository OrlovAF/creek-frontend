const {REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT} = process.env;

export default class ChartService {
  static getWeka(day) {
    return fetch(`${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/weka?from=${day}`).then((res) => res.json());
  }

  static getWatino(day) {
    return fetch(`${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/watino?from=${day}`).then((res) => res.json());
  }
}