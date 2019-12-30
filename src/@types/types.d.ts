interface AppState {
  router: import('connected-react-router').RouterState;
  counter?: import('../containers/CounterPage/types').CounterState;
  repos?: import('../containers/ReposPage/types').ReposState;
}
