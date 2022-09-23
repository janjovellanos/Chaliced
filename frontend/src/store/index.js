import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./product";
import favoritesReducer from "./favorite";
import reviewsReducer from "./review";
import sellersReducer from "./seller";
import myReducer from "./my";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  favorites: favoritesReducer,
  reviews: reviewsReducer,
  sellers: sellersReducer,
  my: myReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
