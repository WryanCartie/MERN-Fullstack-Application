import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Suspense
  Switch,
} from "react-router-dom";


import { AuthContext } from "./shared/context/auth-context";
import { useAuth} from './shared/hooks/auth-hooks'
import Users from "./user/pages/Users";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";


const NewPlace = React.lazy(()=> import ("./places/pages/NewPlace"));
const UserPlaces= React.lazy(()=> import ("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(()=> import ("./places/pages/UpdatePlace"));
const Auth = React.lazy(()=> import ("./user/pages/Auth"));

const App = () => {
  const{token,login,logout,userId} = useAuth()

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places"exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/auth" exact>
          <Auth />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        isLoggedIn: !!token,
        userId: userId,
        token: token,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={
            <div className="center">
              <LoadingSpinner/>
            </div>
          }>
          {routes}</main>
            </Suspense>
         
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
