import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './slices';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);

export default store;

// import createSagaMiddleware from 'redux-saga';
// import AsyncStorage from '@react-native-community/async-storage';
// import logger from 'redux-logger';

// const sagaMiddleware = createSagaMiddleware();

// import {configureStore} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import rootReducer from './slice';
// import rootSaga from './sagas';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: ['app', 'listing'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [sagaMiddleware, logger],
// });
// const persistor = persistStore(store);
// sagaMiddleware.run(rootSaga);

// export {persistor};
// export default store;
