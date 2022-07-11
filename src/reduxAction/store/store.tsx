import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '../reduxReducers/rootReducers';

const saveState = (state: { handleLogin: any }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
// store.subscribe(() => {
//   saveState({
//     handleLogin: store?.getState()?.handleLogin,
//   });
// });
export default store;
