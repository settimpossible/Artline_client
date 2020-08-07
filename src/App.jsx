import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ActivityFullPage from "./components/Activities/ActivityFullPage";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [background, setBackground] = useState("transparent");
  let { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ background }} className="App">
      <NavMain />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/activity/:id">
            <ActivityFullPage />
          </Route>
          <Route exact path="/signin">
            <Signin setBackground={setBackground} />
          </Route>
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
