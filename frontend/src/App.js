import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Explore from "./components/ProductComponents/Explore";
import ProductPage from "./components/ProductComponents/ProductPage";
import ProfilePage from "./components/UserComponents/ProfilePage";

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {sessionUser &&
          <>
          <Route exact path="/shop">
            <Explore />
          </Route>
          <Route exact path="/products/:productId">
            <ProductPage />
          </Route>
          <Route exact path="/users/:userId">
            <ProfilePage />
          </Route>
          <Route exact path="/users/:userId/transactions">
            <ProfilePage />
          </Route>
          <Route exact path="/users/:userId/favorites">
            <ProfilePage />
          </Route>
          </>
          }
        </Switch>
      )}
    </>
  );
}

export default App;
