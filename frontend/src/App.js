import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Explore from "./components/ProductComponents/Explore";
import ProductPage from "./components/ProductComponents/ProductPage";
import ProfilePage from "./components/UserComponents/ProfilePage";
import Footer from "./components/Footer/Footer";

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
          <Route exact path="/shop/tops">
            <Explore />
          </Route>
          <Route exact path="/shop/bottoms">
            <Explore />
          </Route>
          <Route exact path="/shop/shoes">
            <Explore />
          </Route>
          <Route exact path="/shop/accessories">
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
      <Footer />
    </>
  );
}

export default App;
