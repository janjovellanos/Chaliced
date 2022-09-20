import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Explore from "./components/ProductComponents/Explore";
import ProductPage from "./components/ProductComponents/ProductPage";
import ProfilePage from "./components/UserComponents/ProfilePage";

function App() {
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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/shop">
            <Explore />
          </Route>
          <Route exact path="/products/:productId">
            <ProductPage />
          </Route>
          <Route exact path="/users/:userId">
            <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
