import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux';
// import rootReducer from './src/stores/rootReducer';
import Navigation from './src/navigation';
import store from './src/stores';

// const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );

  // return <Navigation />;
};

export default App;
