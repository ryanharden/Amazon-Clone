import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import productReducer from './products';
import cartItemReducer from './cartitem';
import ordersReducer from './orders';
import reviewReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  Products: productReducer,
  CartItems: cartItemReducer,
  Orders: ordersReducer,
  Reviews: reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
